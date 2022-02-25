import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {deny, error, fault, success} from "./responses";
import {getUserInfo, userHasGroup} from "./auth";

const tableName = "PSGameData";
const client = new DynamoDBClient({ region: "us-east-1" });
// DynamoDB document client abstracts the mapping from ddb attributes into javascript objects.
// docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const ddb = DynamoDBDocument.from(client);

/**
 * GET games/survivor42/cast
 *
 * returns the survivor season 42 cast
 */
export async function getCast(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const results = await ddb.get({
            TableName: tableName,
            Key: { entityId: "FantasySurvivor-S42", resourceId: "Cast" }
        });

        return success({
            message: "Success.",
            items: results.Item?.survivors,
        });
    } catch (err) {
        return fault({ message: err });
    }
}

/**
 * POST games/survivor42/cast
 *
 * updates the survivor season 42 cast
 */
export async function setCast(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (!userHasGroup(event, "Admins")) {
        return deny();
    }
    if (!event.body) {
        return error({ message: "Invalid Request: Missing post body." });
    }
    const request = JSON.parse(event.body);
    if (!request?.survivors) {
        return error({ message: "Invalid Request: survivors is a required field." });
    }
    for (let survivor of request.survivors) {
        if (!isSurvivor(survivor)) {
            return error({ message: `Invalid Request: survivor ${survivor} does not match schema.` });
        }
    }

    try {
        const result = await ddb.put({
            TableName: tableName,
            Item: {
                entityId: "FantasySurvivor-S42",
                resourceId: "Cast",
                survivors: request.survivors,
                resourceType: "Cast"
            }
        });
        return success({
            message: "Success.",
            attributes: result.Attributes,
        })
    } catch (err) {
        return fault({ message: err });
    }
}

/**
 * GET /games/survivor42/predictions
 *
 * get all game-predictions, sorted by most recent Episode
 */
export async function getPredictions(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const results = await ddb.query({
            TableName: tableName,
            KeyConditionExpression: "entityId = :entityId and begins_with(resourceId, :resourceType)",
            ExpressionAttributeValues: { ':entityId': 'FantasySurvivor-S42', ':resourceType': 'Prediction' },
            ScanIndexForward: false,
            Limit: 10
        });

        return success({
            message: "Success.",
            items: results.Items,
        });
    } catch (err) {
        return fault({ message: err });
    }
}

/**
 * POST /games/survivor42/predictions
 *
 * edit or put a new game-prediction
 */
export async function setPrediction(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (!userHasGroup(event, "Admins")) { return deny(); }
    if (!event.body) { return error({ message: "Invalid Request: Missing post body." }); }
    const request = JSON.parse(event.body);
    if (!request?.prediction || !request?.prediction?.episode || !request?.prediction?.predictionType || !request?.prediction?.reward || !request?.prediction?.select || !request?.prediction?.predictBefore || !request?.prediction?.options) {
        return error({ message: "Invalid Request: missing required fields." });
    }

    try {
        const result = await ddb.put({
            TableName: tableName,
            Item: {
                entityId: "FantasySurvivor-S42",
                resourceId: `Prediction-${request.prediction.episode}-${request.prediction.predictionType}`,
                episode: request.prediction.episode,
                reward: request.prediction.reward,
                predictBefore: request.prediction.predictBefore,
                select: request.prediction.select,
                predictionType: request.prediction.predictionType,
                options: request.prediction.options,
                resourceType: "Prediction",
                lastUpdatedDate: new Date().getTime(),
            }
        });
        return success({
            message: "Success.",
            attributes: result.Attributes,
        })
    } catch (err) {
        return fault({ message: err });
    }
}

/**
 * POST /games/survivor42/predictions/delete
 *
 * deletes a prediction. Revokes
 */
export async function deletePrediction(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (!userHasGroup(event, "Admins")) { return deny(); }
    if (!event.body) { return error({ message: "Invalid Request: Missing body." }); }
    const request = JSON.parse(event.body);
    if (!request?.prediction || !request?.prediction?.episode || !request?.prediction?.predictionType || !request?.revokePoints) {
        return error({ message: "Invalid Request: missing required fields." });
    }
    const resourceId = `FantasySurvivor-S42-UserPrediction-${request.prediction.episode}-${request.prediction.predictionType}`;
    if (request.revokePoints) {
        try {
            const userPoints = await ddb.query({
                TableName: tableName,
                IndexName: "pointsIndex",
                KeyConditionExpression: "resourceId = :resourceId",
                ExpressionAttributeValues: {
                    ':resourceId': 'FantasySurvivor-S42-UserPoints',
                },
            });
            // for each userPoints record
            for (const userPointsRecord of userPoints.Items || []) {
                // if the user has points for this prediction being deleted
                const historyEvent = userPointsRecord.pointHistory.find((item: { event: string; }) => item.event === resourceId);
                if (historyEvent) {
                    // then remove them (put back the points record with points subtracted)
                    await ddb.put({
                        TableName: tableName,
                        Item: {
                            ...userPointsRecord,
                            points: userPointsRecord.points - historyEvent.pointsAdded,
                            pointHistory: userPointsRecord.pointHistory.filter((item: { event: string; }) => item.event !== resourceId),
                        }
                    })
                }
            }
            const userPredictions = await ddb.query({
                TableName: tableName,
                IndexName: "resourceTypeIndex",
                KeyConditionExpression: "resourceType = :resourceType and resourceId = :resourceId",
                ExpressionAttributeValues: {
                    ':resourceType': 'UserPrediction',
                    ':resourceId': resourceId,
                },
            });
            // delete each userPrediction record.
            for (const userPredictionRecord of userPredictions.Items || []) {
                await ddb.delete({
                    TableName: tableName,
                    Key: {
                        entityId: userPredictionRecord.entityId,
                        resourceId: userPredictionRecord.resourceId,
                    }
                })
            }
        } catch (err) {
            return fault({ message: err });
        }
    }

    try {
        const result = await ddb.delete({
            TableName: tableName,
            Key: {
                entityId: "FantasySurvivor-S42",
                resourceId: `Prediction-${request.prediction.episode}-${request.prediction.predictionType}`,
            }
        });
        return success({
            message: "Success.",
            attributes: result.Attributes,
        })
    } catch (err) {
        return fault({ message: err });
    }
}

/**
 * GET /games/survivor42/userPredictions
 *
 * get all userPredictions
 */
export async function getUserPredictions(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const results = await ddb.query({
            TableName: tableName,
            IndexName: "resourceTypeIndex",
            KeyConditionExpression: "resourceType = :resourceType",
            ExpressionAttributeValues: { ':resourceType': "UserPrediction" },
        });
        return success({
            message: "Success.",
            items: results.Items,
        });
    } catch (err) {
        return fault({ message: err });
    }
}

/**
 * GET /games/survivor42/userPrediction/:sub
 *
 * get a specific user's userPredictions
 */
export async function getUserPrediction(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (!event.pathParameters?.sub) {
        return error({ message: "Invalid Request: Missing sub path parameter." });
    }
    try {
        const results = await ddb.query({
            TableName: tableName,
            KeyConditionExpression: "entityId = :entityId and begins_with(resourceId, :resourceType)",
            ExpressionAttributeValues: { ':entityId': event.pathParameters?.sub, ':resourceType': 'FantasySurvivor-S42-UserPrediction' },
        });
        return success({
            message: "Success.",
            items: results.Items,
        });
    } catch (err) {
        return fault({ message: err });
    }
}


/**
 * POST /games/survivor42/userPredictions
 *
 * submit/edit your user prediction
 */
export async function setUserPrediction(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const { username, sub } = getUserInfo(event);
    if (!event.body) { return error({ message: "Invalid Request: Missing post body." }); }
    const request = JSON.parse(event.body);
    console.log(`setUserPrediction request for user ${username} - ${event.body}`);
    if (!request?.userPrediction || !request?.userPrediction?.episode || !request?.userPrediction?.predictionType || !request?.userPrediction?.selections) {
        return error({ message: "Invalid Request: missing required fields." });
    }
    const requestTime = new Date().getTime();
    // based on the request episode+predictionType, fetch the prediction from game data. We need to make sure the
    // predicion is still ongoing, and the user's selections are even eligible for the prediction
    try {
        const result = await ddb.get({
            TableName: tableName,
            Key: {
                entityId: "FantasySurvivor-S42",
                resourceId: `Prediction-${request.userPrediction.episode}-${request.userPrediction.predictionType}`
            }
        });
        if (!result.Item) {
            return error({ message: "Invalid Request: prediction does not exist." });
        }
        if (requestTime > result.Item.predictBefore) {
            return error({ message: "Invalid Request: prediction window has ended." });
        }
        if (!optionsContainSelections(result.Item.options, request.userPrediction.selections)) {
            return error({ message: "Invalid Request: user prediction contained invalid survivor ids for this prediction." });
        }
    } catch (err) {
        console.log(err);
        return fault({ message: err });
    }

    // insert the userPrediction record
    try {
        const result = await ddb.put({
            TableName: tableName,
            Item: {
                entityId: sub,
                resourceId: `FantasySurvivor-S42-UserPrediction-${request.userPrediction.episode}-${request.userPrediction.predictionType}`,
                predictionId: `Prediction-${request.userPrediction.episode}-${request.userPrediction.predictionType}`,
                episode: request.userPrediction.episode,
                predictionType: request.userPrediction.predictionType,
                selections: request.userPrediction.selections,
                resourceType: "UserPrediction",
                lastUpdatedDate: requestTime,
                username: username,
            }
        });
        return success({
            message: "Success.",
            attributes: result.Attributes,
        })
    } catch (err) {
        console.log(err);
        return fault({ message: err });
    }
}

/**
 * POST /games/survivor42/predictions/complete
 *
 * complete a prediction by providing the results, awarding points to users.
 */
export async function completePrediction(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (!userHasGroup(event, "Admins")) { return deny(); }
    if (!event.body) { return error({ message: "Invalid Request: Missing body." }); }
    const request = JSON.parse(event.body);
    console.log(`completePrediction request - ${event.body}`);
    if (!request?.prediction || !request?.prediction?.episode || !request?.prediction?.predictionType || !request?.prediction?.selections) {
        return error({ message: "Invalid Request: missing required fields." });
    }
    const requestTime = new Date().getTime();
    // first, fetch the prediction record and make sure the prediction window has ended, and the results match the prediction options
    let prediction;
    try {
        const result = await ddb.get({
            TableName: tableName,
            Key: {
                entityId: "FantasySurvivor-S42",
                resourceId: `Prediction-${request.prediction.episode}-${request.prediction.predictionType}`,
            }
        });
        if (!result.Item) {
            return error({ message: "Invalid Request: prediction does not exist." });
        }
        if (requestTime < result.Item.predictBefore) {
            return error({ message: "Invalid Request: prediction cannot be completed because the prediction window hasn't ended." });
        }
        if (!optionsContainSelections(result.Item.options, request.prediction.selections)) {
            return error({ message: "Invalid Request: input prediction completion selections contained invalid survivor ids for this prediction." });
        }
        if (result.Item.results) {
            return error({ message: "Invalid Request: prediction has already been completed."})
        }
        prediction = result.Item;
    } catch (err) {
        console.log(err);
        return fault({ message: err });
    }
    // for each user-prediction record for this resourceId, match the user selections with the prediction results to compute points
    const userPoints = [];
    const resourceId = `FantasySurvivor-S42-UserPrediction-${request.prediction.episode}-${request.prediction.predictionType}`;
    try {
        const results = await ddb.query({
            TableName: tableName,
            IndexName: "resourceTypeIndex",
            KeyConditionExpression: "resourceType = :resourceType and resourceId = :resourceId",
            ExpressionAttributeValues: {
                ':resourceType': 'UserPrediction',
                ':resourceId': resourceId,
            },
        });
        for (const userPrediction of results.Items || []) {
            userPoints.push({
                userSub: userPrediction.entityId,
                username: userPrediction.username,
                pointsToAward: calculatePoints(request.prediction.selections, prediction.reward, userPrediction),
            });
        }
    } catch (err) {
        console.log(err);
        return fault({ message: err });
    }
    // award points to each user, mark the user-points record as having been updated for the completed predictionId
    try {
        for (const { userSub, pointsToAward, username } of userPoints) {
            const getResult = await ddb.get({
                TableName: tableName,
                Key: {
                    entityId: userSub,
                    resourceId: "FantasySurvivor-S42-UserPoints",
                }
            });
            let userPointsRecord;
            if (!getResult.Item) {
                // if this user has no points, create a fresh record.
                userPointsRecord = {
                    entityId: userSub,
                    resourceId: "FantasySurvivor-S42-UserPoints",
                    pointHistory: [
                        { event: resourceId, pointsAdded: pointsToAward }
                    ],
                    resourceType: "UserPoints",
                    points: pointsToAward,
                    lastUpdatedDate: requestTime,
                    username: username,
                }
            } else {
                // otherwise, fill from the existing record with some edits
                // if points were already awarded for this event, skip (idempotency)
                if (getResult.Item.pointHistory.find((thing: { event: string; }) => thing.event === resourceId)) {
                    userPointsRecord = getResult.Item;
                } else {
                    userPointsRecord = {
                        ...getResult.Item,
                        pointHistory: [
                            ...getResult.Item.pointHistory,
                            {event: resourceId, pointsAdded: pointsToAward}
                        ],
                        points: getResult.Item.points += pointsToAward,
                        lastUpdatedDate: requestTime
                    }
                }
            }
            console.log(`Adding ${pointsToAward} points for userSub ${userSub}, from prediction ${resourceId}.`);
            const putResult = await ddb.put({
                TableName: tableName,
                Item: userPointsRecord,
            });
        }
    } catch (err) {
        console.log(err);
        return fault({ message: err });
    }
    // finally, once all user-prediction records are covered, mark the game-prediction record as completed
    try {
        const result = await ddb.put({
            TableName: tableName,
            Item: {
                ...prediction,
                results: request.prediction.selections,
                lastUpdatedDate: requestTime,
            }
        });
    } catch (err) {
        console.log(err);
        return fault({ message: err });
    }
    return success({ message: "Success." });
}

/**
 * GET /games/survivor42/leaderboard
 *
 * get points for all users, to populate the leaderboard.
 */
export async function getLeaderboard(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    try {
        const result = await ddb.query({
            TableName: tableName,
            IndexName: "pointsIndex",
            KeyConditionExpression: "resourceId = :resourceId",
            ExpressionAttributeValues: {
                ':resourceId': 'FantasySurvivor-S42-UserPoints'
            },
            ScanIndexForward: false,
        });
        return success({
            message: "Success.",
            items: result.Items,
        })
    } catch (err) {
        console.log(err);
        return fault({ message: err });
    }
}

function calculatePoints(resultSelections: any, reward: number, userPrediction: any) {
    let pointsToAward = 0;
    for (const id of resultSelections) {
        for (const userSelectionId of userPrediction.selections) {
            if (userSelectionId === id) {
                pointsToAward += reward;
            }
        }
    }
    return pointsToAward;
}

function optionsContainSelections(options: string[], selections: string[]) {
    for (let id of selections) {
        if (!options.includes(id)) {
            return false;
        }
    }
    return true;
}


export interface Survivor {
    name: string,
    age: number,
    hometown: string,
    occupation: string,
    votedOut?: string,
    challengesWon?: ChallengeVictory[]
}

export interface ChallengeVictory {
    challengeType: string, // REWARD, IMMUNITY
    episode: string, // E01, E02, ...
    immunityType: string, // INDIVIDUAL, TRIBAL
}

function isSurvivor(s: any): s is Survivor {
    if (s.name !== undefined && typeof s.name === 'string' &&
        s.age !== undefined && typeof s.age === 'number' &&
        s.hometown !== undefined && typeof s.hometown === 'string' &&
        s.occupation !== undefined && typeof s.occupation === 'string') {
        return true;
    } else {
        return false;
    }
}

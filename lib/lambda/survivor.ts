import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {deny, error, fault, success} from "./responses";
import {getUserInfo, userHasGroup} from "./auth";
import {type} from "os";

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
 * DELETE /games/survivor42/predictions
 *
 * deletes a prediction.
 */
export async function deletePrediction(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    if (!userHasGroup(event, "Admins")) { return deny(); }
    if (!event.body) { return error({ message: "Invalid Request: Missing body." }); }
    const request = JSON.parse(event.body);
    if (!request?.prediction || !request?.prediction?.episode || !request?.prediction?.predictionType) {
        return error({ message: "Invalid Request: missing required fields." });
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
 * get your own userPredictions
 */
export async function getUserPredictions(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
    const { username, sub } = getUserInfo(event);
    console.log(`getUserPrediction request for user ${username}.`);

    try {
        const results = await ddb.query({
            TableName: tableName,
            KeyConditionExpression: "entityId = :entityId and begins_with(resourceId, :resourceType)",
            ExpressionAttributeValues: { ':entityId': sub, ':resourceType': 'FantasySurvivor-S42-Prediction' },
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
                resourceId: `FantasySurvivor-S42-Prediction-${request.userPrediction.episode}-${request.userPrediction.predictionType}`,
                predictionId: `Prediction-${request.userPrediction.episode}-${request.userPrediction.predictionType}`,
                episode: request.userPrediction.episode,
                predictionType: request.userPrediction.predictionType,
                selections: request.userPrediction.selections,
                resourceType: "UserPrediction",
                lastUpdatedDate: requestTime,
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

function optionsContainSelections(options: { id: string }[], selections: { id: string }[]) {
    const validIds = options.map(s => s.id);
    for (let { id } of selections) {
        if (!validIds.includes(id)) {
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

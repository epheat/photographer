import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from "aws-lambda";
import {deny, error, fault, success} from "./responses";
import {userHasGroup} from "./auth";
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
    const item = JSON.parse(event.body);
    if (!item?.survivors) {
        return error({ message: "Invalid Request: survivors is a required field." });
    }
    for (let survivor of item.survivors) {
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
                survivors: item.survivors,
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

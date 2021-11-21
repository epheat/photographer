import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fault, success, error } from './responses';
import { v4 as uuidv4 } from "uuid";

// TODO: environment variables for constants like table name
const tableName = "PSPosts";
const client = new DynamoDBClient({ region: "us-east-1" });
const ddb = DynamoDBDocument.from(client);

/**
 * GET /posts
 * 
 * Returns latest 10 posts
 * TODO: pagination
 */
export async function get(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  // get the first 10 posts, sorted by timestamp by querying on the "postTypeTimeSorted" index.
  try {
    const results = await ddb.query({
      TableName: tableName,
      IndexName: "postTypeTimeSorted",
      KeyConditionExpression: "postType = :postType",
      ExpressionAttributeValues: { ':postType': 'TEXT' },
      Limit: 10
    });
    
    return success({
        items: results.Items,
        lastEvaluatedKey: results.LastEvaluatedKey
    });
  } catch (err) {
    console.log(err);
    return fault({
      message: err
    });
  }
}

/**
 * POST /posts/new
 * 
 * Creates a new post.
 */
export async function put(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  if (!event.body) {
    return error({ message: "Invalid Request: Missing post body." });
  }
  let item = JSON.parse(event.body);
  if (!item?.post?.title || !item?.post?.content) {
    return error({ message: "Invalid Request: title & content are required fields." });
  }
  let id = uuidv4();
  let createdDate = Date.now();
  
  try {
    const putResult = await ddb.put({
      TableName: tableName,
      Item: {
        postId: id,
        postType: 'TEXT',
        createdDate: createdDate,
        author: 'heatone', // TODO: get from authorizer
        title: item.post.title,
        content: item.post.content
      }
    });
    return success({
      message: "Success.",
      attributes: putResult.Attributes,
    });
  } catch (err) {
    return fault({
      message: err
    });
  }
}

/**
 * DELETE /posts/{postId}
 * 
 * Deletes a post.
 */
export async function del(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  return success({
    message: "Success.",
  })
}

/**
 * 
 */
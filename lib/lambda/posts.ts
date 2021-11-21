import { APIGatewayProxyEventV2, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { failure, success } from './responses';

// TODO: environment variables for constants like table name
const tableName = "PSPosts";
const client = new DynamoDBClient({ region: "us-east-1" });
const ddb = DynamoDBDocument.from(client);

/**
 * GET /posts
 * 
 * Returns latest 10 posts (paginated)
 */
export async function get(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  // get the first 10 posts, sorted by timestamp by querying on the "postTypeTimeSorted" index.
  try {
    const results = await ddb.query({
      TableName: tableName,
      IndexName: "postTypeTimeSorted",
      KeyConditionExpression: "postType = :postType",
      ExpressionAttributeValues: {
        ':postType': 'TEXT',
      },
    });
    
    return success({
        items: results.Items,
        lastEvaluatedKey: results.LastEvaluatedKey
    });
  } catch (err) {
    console.log(err);
    return failure({
      errorMessage: err
    });
  }
}

/**
 * POST /posts
 * 
 * Creates a new post.
 */
export async function put(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  let item = event.body;
  

  return success({});
}

/**
 * DELETE /posts/{postId}
 * 
 * Deletes a post.
 */
export async function del(event: APIGatewayProxyEventV2): Promise<APIGatewayProxyResultV2> {
  return success({
    message: "Deleted nothing.",
  })
}

/**
 * 
 */
import { APIGatewayProxyEventV2, APIGatewayProxyEventV2WithJWTAuthorizer, APIGatewayProxyResultV2 } from 'aws-lambda';
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";
import { fault, success, error } from './responses';
import { v4 as uuidv4 } from "uuid";
import { getUserInfo } from "./auth";
import middy from '@middy/core';
import cloudwatchMetrics, { Context } from '@middy/cloudwatch-metrics';
import { requireGroup } from './middleware';

// TODO: environment variables for constants like table name
const tableName = "PSPosts";
const client = new DynamoDBClient([{ region: "us-east-1" }]);
// DynamoDB document client abstracts the mapping from ddb attributes into javascript objects.
// docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html
const ddb = DynamoDBDocument.from(client);

/**
 * GET /posts
 * 
 * Returns latest 20 posts
 * TODO: pagination
 */
async function getPosts(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> {
  context.metrics.setProperty("RequestId", context.awsRequestId);
  // get the first 10 posts, sorted by timestamp by querying on the "postTypeTimeSorted" index.
  try {
    const results = await ddb.query({
      TableName: tableName,
      IndexName: "postTypeTimeSorted",
      KeyConditionExpression: "postType = :postType",
      ScanIndexForward: false,
      ExpressionAttributeValues: { ':postType': 'TEXT' },
    });
    
    return success({
      message: "Success.",
      items: results.Items,
      lastEvaluatedKey: results.LastEvaluatedKey
    });
  } catch (err) {
    return fault({ message: err });
  }
}

/**
 * GET /posts/{postId}
 * 
 * Returns the post with postId={postId}
 */
async function getPost(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> {
  context.metrics.setProperty("RequestId", context.awsRequestId);
  if (!event.pathParameters?.postId) {
    return error({ message: "Invalid Request: Missing postId path parameter." });
  }
  try {
    const result = await ddb.get({
      TableName: tableName,
      Key: { postId: event.pathParameters.postId }
    });

    if (!result.Item) {
      return error({ message: "Post does not exist." });
    }

    const previous = await ddb.query({
      TableName: tableName,
      IndexName: "postTypeTimeSorted",
      KeyConditionExpression: "postType = :postType and createdDate < :createdDate",
      ExpressionAttributeValues: { ':postType': 'TEXT', ':createdDate': result.Item.createdDate },
      ScanIndexForward: false,
      Limit: 1,
    });

    const next = await ddb.query({
      TableName: tableName,
      IndexName: "postTypeTimeSorted",
      KeyConditionExpression: "postType = :postType and createdDate > :createdDate",
      ExpressionAttributeValues: { ':postType': 'TEXT', ':createdDate': result.Item.createdDate },
      Limit: 1,
    });

    return success({
      message: "Success.",
      post: {
        ...result.Item,
        previous: previous.Items?.length === 1 ? previous.Items[0] : null,
        next: next.Items?.length === 1 ? next.Items[0] : null,
      },
    });
  } catch (err) {
    return fault({ message: err });
  }
}

/**
 * POST /posts/new
 * 
 * Creates a new post.
 */
async function putPost(event: APIGatewayProxyEventV2WithJWTAuthorizer, context: Context): Promise<APIGatewayProxyResultV2> {
  context.metrics.setProperty("RequestId", context.awsRequestId);
  if (!event.body) {
    return error({ message: "Invalid Request: Missing post body." });
  }
  const item = JSON.parse(event.body);
  if (!item?.post?.title || !item?.post?.content) {
    return error({ message: "Invalid Request: title & content are required fields." });
  }
  const { username, sub } = getUserInfo(event);
  const id = uuidv4();
  const createdDate = Date.now();
  try {
    const putResult = await ddb.put({
      TableName: tableName,
      Item: {
        postId: id,
        postType: 'TEXT',
        createdDate: createdDate,
        author: username,
        authorSub: sub,
        title: item.post.title,
        content: item.post.content
      }
    });
    return success({
      message: "Success.",
      attributes: putResult.Attributes,
    });
  } catch (err) {
    return fault({ message: err });
  }
}

/**
 * POST /posts/{postId}
 *
 * Edits a post.
 */
async function editPost(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> {
  context.metrics.setProperty("RequestId", context.awsRequestId);
  if (!event.body) {
    return error({ message: "Invalid Request: Missing post body." });
  }
  if (!event.pathParameters?.postId) {
    return error({ message: "Invalid Request: Missing postId path parameter." });
  }
  let item = JSON.parse(event.body);
  if (!item?.post?.title && !item?.post?.content) {
    return error({ message: "Invalid Request: either title or content is required to edit." });
  }
  // get the existing post
  let postItem: any;
  try {
    const getResult = await ddb.get({
      TableName: tableName,
      Key: { postId: event.pathParameters.postId },
    });
    if (!getResult.Item) {
      return error({ message: `Invalid Request: post doesn't exist with postId ${event.pathParameters.postId}`})
    }
    postItem = getResult.Item;
  } catch (err) {
    return fault({ message: err })
  }
  // update that post with new values for title & content from the request
  const editedDate = Date.now();
  try {
    const putResult = await ddb.put({
      TableName: tableName,
      Item: {
        ...postItem,
        // overwrite title/content with values from request (if they exist)
        title: item.post.title ?? postItem.title,
        content: item.post.content ?? postItem.content,
        editedDate: editedDate,
      }
    });
    return success({
      message: "Success.",
      attributes: putResult.Attributes,
    });
  } catch (err) {
    return fault({ message: err });
  }
}


/**
 * DELETE /posts/{postId}
 * 
 * Deletes a post.
 */
async function deletePost(event: APIGatewayProxyEventV2, context: Context): Promise<APIGatewayProxyResultV2> {
  context.metrics.setProperty("RequestId", context.awsRequestId);
  if (!event.pathParameters?.postId) {
    return error({ message: "Invalid Request: Missing postId path parameter." });
  }
  try {
    const deleteResult = await ddb.delete({
      TableName: tableName,
      Key: { postId: event.pathParameters.postId }
    });
    return success({
      message: "Success.",
      attributes: deleteResult.Attributes,
    });
  } catch (err) {
    return fault({ message: err })
  }
}

function getMetricsOptions(operation: string) {
  return {
    namespace: "PS-Posts-API",
    dimensions: [
      { "Operation": operation }
    ]
  }
}

export const getAll = middy(getPosts).use(cloudwatchMetrics(getMetricsOptions("GetAllPosts")));
export const get = middy(getPost).use(cloudwatchMetrics(getMetricsOptions("GetPost")));
export const put = middy(putPost).use(requireGroup("Admins")).use(cloudwatchMetrics(getMetricsOptions("PutPost")));
export const edit = middy(editPost).use(requireGroup("Admins")).use(cloudwatchMetrics(getMetricsOptions("EditPost")));
export const del = middy(deletePost).use(requireGroup("Admins")).use(cloudwatchMetrics(getMetricsOptions("DeletePost")));
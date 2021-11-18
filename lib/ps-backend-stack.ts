import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import * as apigateway from "@aws-cdk/aws-apigatewayv2";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations";
import { PSAuth } from "./constructs/ps-auth";


export interface PSBackendStackProps extends cdk.StackProps {
  domain: String,
}

export class PSBackendStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: PSBackendStackProps) {
    super(scope, id, props);

    // DynamoDB Storage
    // Users, Posts, Albums tables
    const postsTable = new dynamodb.Table(this, 'posts-table', {
      tableName: "PSPosts",
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: { name: 'postId', type: dynamodb.AttributeType.STRING },
      pointInTimeRecovery: true
    });

    postsTable.addGlobalSecondaryIndex({
      indexName: 'postTypeTimeSorted',
      partitionKey: { name: 'postType', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'createdDate', type: dynamodb.AttributeType.NUMBER },
      projectionType: dynamodb.ProjectionType.ALL,
    });

    // AuthN
    // a cognito userpool for vending JWTs, and associated IAM roles
    const auth = new PSAuth(this, 'ps-auth');

    // Lambda functions
    // for now just a default logging function
    const loggerLambda = new lambda.Function(this, 'logger-function', {
      code: lambda.Code.fromAsset(path.join(__dirname, "./lambda")),
      handler: "ps-logger.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {}
    });

    // APIG HTTP API
    // for setting up API routes to Lambdas
    const httpApi = new apigateway.HttpApi(this, 'ps-posts-api', {
      description: 'photographer-website API routes',
      apiName: `ps-posts-api-${props.domain}`,
      corsPreflight: {
        allowMethods: [
          apigateway.CorsHttpMethod.GET,
          apigateway.CorsHttpMethod.POST,
        ],
        allowOrigins: ['*'],
      },
    });

    httpApi.addRoutes({
      path: '/posts',
      methods: [apigateway.HttpMethod.GET],
      integration: new integrations.LambdaProxyIntegration({
        handler: loggerLambda
      })
    });
    
    // Outputs - e.g. userpoolId, clientId, apiUrls, to be fed into the website stack
    new cdk.CfnOutput(this, 'user-pool-id-output', {
      value: auth.userPool.userPoolId,
      description: 'The id for the created user pool',
      exportName: `userPoolId-${props.domain}`,
    });
    new cdk.CfnOutput(this, 'user-pool-client-id-output', {
      value: auth.client.userPoolClientId,
      description: 'The client id for the photographer website app',
      exportName: `userPoolClientId-${props.domain}`,
    });
    // TODO: export for API url
  }
}
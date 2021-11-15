import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigatewayv2";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations";
import * as authorizers from "@aws-cdk/aws-apigatewayv2-authorizers";
import * as lambdaNode from "@aws-cdk/aws-lambda-nodejs";
import * as s3 from "@aws-cdk/aws-s3";
import * as deployment from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as path from "path";

export class PSWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // DynamoDB Storage
    // Users, Posts, Albums tables
    // PSPosts table
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

    // Lambda functions
    // for now just a default logging function
    const loggerLambda = new lambda.Function(this, 'logger-function', {
      code: lambda.Code.fromAsset(path.join(__dirname, "./lambda")),
      handler: "ps-logger.handler",
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: {}
    })

    // APIG HTTP API
    // for setting up API routes to Lambdas
    const httpApi = new apigateway.HttpApi(this, 'ps-posts-api', {
      description: 'photographer-website API routes',
      apiName: 'ps-posts-api',
      corsPreflight: {
        allowMethods: [
          apigateway.CorsHttpMethod.GET,
          apigateway.CorsHttpMethod.POST,
        ],
        allowOrigins: ['*'],
      },
    })

    httpApi.addRoutes({
      path: '/posts',
      methods: [apigateway.HttpMethod.GET],
      integration: new integrations.LambdaProxyIntegration({
        handler: loggerLambda
      })
    })
    
    // const authorizer = new authorizers.HttpUserPoolAuthorizer({
    //   userPool: 
    //   userPoolClients: [userPoolClient],
    //   identitySource: ['$request.header.Authorization'],
    // });
    // IAM Roles

    // S3 Storage
    // photo uploads
    // const bucket = new s3.Bucket(this, 'website-assets', {
    //   bucketName: cdk.PhysicalName.GENERATE_IF_NEEDED,
    //   encryption: s3.BucketEncryption.S3_MANAGED,
    //   accessControl: s3.BucketAccessControl.PRIVATE,
    //   blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    // });

    // const distribution = new cloudfront.Distribution(this, 'cloudfront-distribution', {
    //   defaultBehavior: {
    //     origin: new origins.S3Origin(bucket),
    //     allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
    //     viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
    //   },
    //   defaultRootObject: 'index.html',
    //   priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
    // });

    // const frontendEntry = path.join(__dirname, '../frontend'); // path to the Vue app

    // new deployment.BucketDeployment(this, 'static-website-deployment', {
    //   sources: [],
    //   destinationBucket: 
    // })

  }
}

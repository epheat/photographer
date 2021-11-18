import * as cdk from "@aws-cdk/core";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as lambda from "@aws-cdk/aws-lambda";
import * as apigateway from "@aws-cdk/aws-apigatewayv2";
import * as integrations from "@aws-cdk/aws-apigatewayv2-integrations";
import * as authorizers from "@aws-cdk/aws-apigatewayv2-authorizers";
import * as lambdaNode from "@aws-cdk/aws-lambda-nodejs";
import * as s3 from "@aws-cdk/aws-s3";
import * as s3deploy from "@aws-cdk/aws-s3-deployment";
import * as cloudfront from "@aws-cdk/aws-cloudfront";
import * as origins from "@aws-cdk/aws-cloudfront-origins";
import * as path from "path";

export interface PSWebsiteStackProps extends cdk.StackProps {
  domain: String
}

export class PSWebsiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: PSWebsiteStackProps) {
    super(scope, id, props);
        
    // S3 Storage
    const bucket = new s3.Bucket(this, 'website-static-asset', {
      bucketName: cdk.PhysicalName.GENERATE_IF_NEEDED,
      encryption: s3.BucketEncryption.S3_MANAGED,
      accessControl: s3.BucketAccessControl.PRIVATE,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });

    const distribution = new cloudfront.Distribution(this, 'cloudfront-distribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(bucket),
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      },
      defaultRootObject: 'index.html',
    });

    const userPoolId = cdk.Fn.importValue(`userPoolId-${props.domain}`);
    const userPoolClientId = cdk.Fn.importValue(`userPoolClientId-${props.domain}`);

    const frontendEntry = path.join(__dirname, '../frontend'); // path to the Vue app
    new s3deploy.BucketDeployment(this, 'static-website-deployment', {
      sources: [
        s3deploy.Source.asset(frontendEntry, {
          bundling: {
            user: 'root',
            image: cdk.DockerImage.fromRegistry('public.ecr.aws/sam/build-nodejs14.x:latest'),
            command: [
              'bash', '-c', [
                'cd /asset-input',
                'npm ci',
                'npm run build',
                'cp -r /asset-input/dist/* /asset-output/',
              ].join('&&'),
            ],
            environment: {
              // tried to reference the userpool attributes, but those are CDK IResolvable tokens.
              // i'll just hard code for now, anyways the clientId and userpoolId aren't secrets.
              // https://stackoverflow.com/questions/41277968/securing-aws-cognito-user-pool-and-client-id-on-a-static-web-page
              VUE_APP_COGNITO_USERPOOL_ID: "us-east-1_eecd1rMOK",
              VUE_APP_COGNITO_CLIENT_ID: "7p8hqhf2gs46jnc1k21hlkvcua"
            }
          }
        }
      )],
      destinationBucket: bucket,
      distribution,
    });
  }
}

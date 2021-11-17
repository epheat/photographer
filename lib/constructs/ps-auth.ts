import { Construct } from "@aws-cdk/core";
import * as cognito from "@aws-cdk/aws-cognito";
import * as lambda from "@aws-cdk/aws-lambda"
import * as iam from "@aws-cdk/aws-iam";

export interface PSAuthProps {
  url: String
}

export class PSAuth extends Construct {
  public readonly userPool: cognito.UserPool;
  public readonly client: cognito.UserPoolClient;

  constructor(scope: Construct, id: string, props: PSAuthProps) {
    super(scope, id);

    // thanks to: https://stackoverflow.com/questions/55784746/how-to-create-cognito-identitypool-with-cognito-userpool-as-one-of-the-authentic
    // and: https://github.com/bobbyhadz/aws-cdk-api-authorizer/blob/master/lib/cdk-starter-stack.ts
    this.userPool = new cognito.UserPool(this, 'ps-users', {
      userPoolName: 'photographerWebsiteUsers',
      autoVerify: {
        email: true
      },
      selfSignUpEnabled: true
    })
    this.client = new cognito.UserPoolClient(this, 'ps-app', {
      generateSecret: false,
      userPool: this.userPool,
      userPoolClientName: 'photographerWebsite',
      supportedIdentityProviders: [
        cognito.UserPoolClientIdentityProvider.COGNITO
      ],
      oAuth: {
        flows: { implicitCodeGrant: true },
        callbackUrls: [`https://${props.url}/login/oauth2/code/cognito`],
        logoutUrls: [`https://${props.url}/logout`],
      }
    })

    // const unauthenticatedRole = new iam.Role(this, 'unauth-role', {
    //   assumedBy: new iam.ServicePrincipal('cognito-identity.amazonaws.com').withConditions({

    //   })
    // })
     
  }
}

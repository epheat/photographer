// response structures that match the APIGateway-Lambda integration response interface
// see: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html

export const success = (body: any) => {
  return buildResponse(200, body);
};

export const fault = (body: any) => {
  return buildResponse(500, body);
};

export const error = (body: any) => {
  return buildResponse(400, body);
}

const buildResponse = (statusCode: number, body: any) => ({
  statusCode: statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(body),
});
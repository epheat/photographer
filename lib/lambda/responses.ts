// response structures that match the APIGateway-Lambda integration response interface
// see: https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-develop-integrations-lambda.html

export const success = (body?: any) => {
  return buildResponse(200, body ?? { message: "Success." });
};

export const fault = (body?: any) => {
  return buildResponse(500, body ?? { message: "Internal failure." });
};

export const error = (body?: any) => {
  return buildResponse(400, body ?? { message: "Error." });
}

export const deny = (body?: any) => {
  return buildResponse(403, body ?? { message: "Access denied." });
}

const buildResponse = (statusCode: number, body: any) => ({
  statusCode: statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(body),
});
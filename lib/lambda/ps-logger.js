async function handler(event) {
  console.log(`The logger function was invoked! event: ${event}`);
  return {
    body: JSON.stringify({ message: "Success" }),
    statusCode: 200
  };
}

module.exports = { handler }
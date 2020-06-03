const server = require("../../server").server;
const axios = require("axios").default;
const constants = require("./constants");
const variables = require("./variables");

beforeAll(async () => {
  // Register a user for the tests
  const userRes = await axios.post(`${constants.API_URI}/user/create`, {
    username: "testuser",
    email: "test@example.com",
    phone: "1234567890",
    password: "DontUseThisPassword",
    displayName: "TestUser",
  });
  variables.userId = userRes.data.data._id;
  variables.token = userRes.data.token;
});

afterAll(async () => {
  // Tear down
  await axios.delete(
    `${constants.API_URI}/user/${variables.userId}&${variables.token}`
  );
  server.close();
});

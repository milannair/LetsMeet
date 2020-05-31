const server = require('../../server').server;

afterAll(() => {
  server.close();
});

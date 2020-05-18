const server = require('../../server');

afterAll(() => {
  server.close();
});

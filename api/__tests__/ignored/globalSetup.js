const kill = require('kill-port');

module.exports = () => {
  console.log('\nKilling any process that is using the port for the API...');
  kill(8000);
};

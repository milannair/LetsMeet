const User = require('./server/models/userModel');

const changeStream = User.watch();

changeStream.on('change', (change) => {
  console.log('change: ' + JSON.stringify(change));
});

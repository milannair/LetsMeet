const User = require('./server/models/userModel');

const pipeline = [
  { $match: { 'fullDocument.username': 'alice' } },
  { $addFields: { newField: 'this is an added field!' } }
];

const changeStream = User.watch();

changeStream.on('change', (change) => {
  console.log('change: ' + JSON.stringify(change));
});

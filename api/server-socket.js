function socketEvents(socket) {
  socket.on('user authenticated', (userId) => {
    socket.userId = userId;
    dbEvents(socket);
  });
}

const mongoose = require("mongoose");
const User = require('./server/models/userModel');
const ObjectId = mongoose.Types.ObjectId;

function dbEvents(socket) {
  const pipeline = [
    { $match: { 'fullDocument._id': ObjectId(socket.userId) } },
  ];

  const changeStream = User.watch(pipeline);

  changeStream.on('change', (change) => {
    console.log(JSON.stringify(change));
    socket.emit('change', change);
  });
}

module.exports = {
  socketEvents: (socket) => socketEvents(socket)
};
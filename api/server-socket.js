const clients = {}; // map userId to socket id

function socketEvents(socket) {
  socket.on('user authenticated', (userId) => {
    console.log('user authenticated: ' + userId);
    socket.userId = userId;
    clients[userId] = socket.id;
  });

  socket.on('disconnect', () => {
    delete clients[socket.userId];
  });
}

const mongoose = require("mongoose");
const User = require('./server/models/userModel');
const ObjectId = mongoose.Types.ObjectId;

function dbEvents(io) {
  // const pipeline = [
  //   { $match: { 'fullDocument._id':  } },
  // ];

  const changeStream = User.watch();

  changeStream.on('change', (change) => {
    if (change.operationType === 'update') {
      for (let key in change.updateDescription.updatedFields) {
        // check for new request (there might be a better way to do this)
        if (key.includes('requests')) {
          io.to(clients[change.documentKey._id]).emit('add group request');
        }
      }
    }
  });
}

module.exports = {
  socketEvents: (socket) => socketEvents(socket),
  dbEvents: (socket) => dbEvents(socket)
};
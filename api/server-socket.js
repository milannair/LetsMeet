function socketEvents(socket) {
  socket.on('test', () => {
    console.log('receive');
    socket.emit('test');
  });
}

module.exports = {
  socketEvents: (socket) => socketEvents(socket)
};
const socketio = require('socket.io');

const wsServer = (srv) => {
  const io = socketio(srv);

  let clients = [];

  io.on('connection', socket => {
    console.log(`Client with id ${socket.id} connected`);
    clients.push(socket.id);

    let i = 0;

    socket.on('message', message => console.log('Message', message));
    socket.emit('message', "I'm server");

    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket.id), 1);
      console.log(`Client with id ${socket.id} disconnected`);
    });
  })


};

module.exports = wsServer;
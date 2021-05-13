const socketio = require('socket.io');

const wsServer = (srv) => {
  const io = socketio(srv);

  let clients = [];

  io.on('connection', socket => {

    socket.join('room1');

    socket.broadcast.to(clients[0]).emit('message', 'hello room1!');
    

    console.log(`Client with id ${socket.id} connected`);
    clients.push(socket.id);

    socket.emit('message', "I'm server");
    socket.emit('clientsId', clients.indexOf(socket.id));

    const valuesArr = [];
    socket.on('scrollValue', scrollValue => {
      valuesArr.push(scrollValue);
      socket.broadcast.to('room1').emit('scrollValueArr', valuesArr);
      console.log('scrollValue:', socket.id, ':', scrollValue);
    });

    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket.id), 1);
      console.log(`Client with id ${socket.id} disconnected`);
    });
  })


};

module.exports = wsServer;

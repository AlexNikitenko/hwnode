const socketio = require('socket.io');

const wsServer = (srv) => {
  const io = socketio(srv);

  let clients = [];
  
  io.on('connection', socket => {

    socket.join('room1');
    io.to('room1').emit('message','hello rooms!');

    // console.log('>>>', io.in('room').allSockets());
    for (var socketId in io.sockets.sockets) {
      io.sockets.sockets[socketId].get('nickname', function(err, nickname) {
          console.log('aaa>>>',nickname);
      });
    }
    
    console.log(`Client with id ${socket.id} connected`);
    clients.push(socket.id);
  
    socket.emit('message', "I'm server");
    // socket.on('message', (msg) => console.log('Message: ', socket.id, ':', msg));
    socket.on('message', (msg) => {
      // io.in('room1').emit('message', msg);
      socket.broadcast.to('room1').emit('message', msg);
      console.log('Message: ', socket.id, ':', msg);
      io.of("room1").adapter.rooms;
      // io.in('room1').clients((err, data)=> {
      //   console.log(data);
      // });
    });
  
    socket.on('disconnect', () => {
      clients.splice(clients.indexOf(socket.id), 1);
      console.log(`Client with id ${socket.id} disconnected`)
    });
  })

}

module.exports = wsServer;
let socket = io();

socket.on('message', message => console.log('Message from server: ', message))
socket.on('private message', message => console.log('Private message from server: ', message))

function sendMessageToServer() {
  console.log('click');
  socket.emit('message', someinput.value);
}
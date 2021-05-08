const formEl = document.querySelector('.main-form');
const answEl = document.querySelector('.output');
const btnSubmit = document.querySelector('.btn-submit');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  axios.post('/sendData', data)
    .then(r => {
      console.log('DATA>>>', r.data.message);
      let socket = io();
      socket.on('message', message => console.log('Message from server', message));
      socket.on('private message', message => console.log('Privat message from server', message));
      
      let i = 0;

      const timerID = setInterval(() => {
        i += 1;
        socket.emit('message', `${r.data.message} ${i}`);
        answEl.innerHTML = `Ok: ${r.data.message} ${i}`;
      }, 1000);
      
    })
    .catch(err => answEl.innerHTML = `ERROR: ${err}`);
});


const formEl = document.querySelector('.main-form');
const answEl = document.querySelector('.output');
const btnSubmit = document.querySelector('.btn-submit');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  axios.post('/sendData', data)
    .then(r => {
      console.log('DATA>>>', r);
      answEl.innerHTML = `Ok: ${r.data.message}`;
    })
    .catch(err => answEl.innerHTML = `ERROR: ${err}`);
});
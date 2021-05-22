const formEl = document.querySelector('.main-form');
const inputUrl = document.querySelector('.input-url');
const outputUrl = document.querySelector('.output-url');
const btnSubmit = document.querySelector('.btn-submit');
const btnCopy = document.querySelector('.btn-copy');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  axios.post('/addUrl', data)
    .then(r => console.log('RRR>>>', r.data))
    .catch(err => console.log(err));
});

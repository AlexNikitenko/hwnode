const formEl = document.querySelector('.main-form');
const answEl = document.querySelector('.answ');
const btnSubmit = document.querySelector('.btn-submit');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const data = new FormData(formEl);
  axios.post('/years', data)
    .then(r => {
      const str = r.data.reduce((str, el) => {
        return `${str}<li>${el.make} ${el.model}</li><br>`;
      }, '');
      answEl.innerHTML = str;
    })
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});
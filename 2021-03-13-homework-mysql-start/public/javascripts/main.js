const formEl = document.querySelector('.main-form');
const answEl = document.querySelector('.answ');
const btnSubmit = document.querySelector('.btn-submit');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const data = new FormData(formEl);
  axios.post('/', data)
    // .then(r => answEl.innerHTML = `Ok: ${r.data}`)
    .then(r => answEl.innerHTML = carsArr.reduce((acc, rec) => {
      return `${str}<li>${rec.make} ${rec.model} ${rec.year}</li><br>`;
    }, ''))
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});
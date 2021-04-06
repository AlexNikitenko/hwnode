const formSelect = document.querySelector('#form-select');
const formInsert = document.querySelector('#form-insert');
const formDelete = document.querySelector('#form-delete');
const answEl = document.querySelector('.output');
const btnSubmit = document.querySelector('.btn-submit');

const thenData = (r) => {
  const str = r.data.reduce((str, el) => {
    return `${str}<li>${el.id} ${el.make} ${el.model} ${el.year}</li><br>`;
  }, '');
  answEl.innerHTML = str;
}

formSelect.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const data = new FormData(formSelect);
  axios.post('/years', data)
    .then(thenData)
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});

formInsert.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const data = new FormData(formInsert);
  axios.post('/insert', data)
    .then(thenData)
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});

formDelete.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const data = new FormData(formDelete);
  axios.post('/delete', data)
    .then(thenData)
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});
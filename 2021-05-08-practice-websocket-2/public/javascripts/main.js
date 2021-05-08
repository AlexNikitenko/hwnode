// const { default: axios } = require("axios");

const formEl = document.querySelector('.main-form');
const answEl = document.querySelector('.output');
const btnSubmit = document.querySelector('.btn-submit');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
    axios.post('/', data)
      .then(r => console.log(r.data))
      .catch(err => console.log(err));
});


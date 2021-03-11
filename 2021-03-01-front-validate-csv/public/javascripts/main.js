const formEl = document.querySelector('.main-form');
const answEl = document.querySelector('.answ');
const btnSubmit = document.querySelector('.btn-submit');

const inputAuthor = document.querySelector('.input-author');
const inputArticle = document.querySelector('.input-article');

formEl.addEventListener('submit', (ev) => {
  ev.preventDefault();

  if (inputAuthor.value.match(/^[a-zA-Zа-яА-я-. ]+[^0-9]$/gi) === null) {  ///Проверка: имя автора содержит: латиницу или кириллицу или тире или пробел или точки и не содержит в себе цифры 0-9
    inputAuthor.classList.add('invalid');
  } else {
    inputAuthor.classList.remove('invalid');
  }

  if (inputArticle.value.match(/^[a-zA-Z,0-9. ]/gi) === null) {  ///Проверка: имя автора латинница, запятые, цифры, точки, пробелы
    inputArticle.classList.add('invalid');
  } else {
    inputArticle.classList.remove('invalid');
  }

  if ((inputAuthor.value.match(/^[a-zA-Zа-яА-я-. ]+[^0-9]$/gi) === null) || (inputArticle.value.match(/^[a-zA-Z,0-9. ]/gi) === null)) {
    return;
  };

  const data = new FormData(formEl);
  axios.post('/', data)
    .then(r => answEl.innerHTML = `Ok: ${r.data}`)
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});
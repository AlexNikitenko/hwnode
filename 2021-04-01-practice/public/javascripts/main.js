const formEl = document.querySelector('.add-article');
const answEl = document.querySelector('.output');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  axios.post('/addArticle', data)
    .then(thenData)
    .catch(err => answEl.innerHTML = `ERROR: ${err}`);
});
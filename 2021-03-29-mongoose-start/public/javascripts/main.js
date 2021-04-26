const formEl = document.querySelector('.add-article');
const answEl = document.querySelector('.output');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  axios.post('/addUser', data)
    .then(r => {
      answEl.innerHTML = `<a href="/article?id=${r.data}">article added.</a>`;
    })
    .catch(err => answEl.innerHTML = `ERROR: ${err}`);
});
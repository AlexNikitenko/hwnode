const form = document.querySelector("form");
const answEl = document.querySelector(".answ");
const listEl = document.querySelector('.files-list');

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  axios.post('/', data)
    .then(r => {
      answEl.innerHTML = `Ok: ${r.data}`;
      // listEl.innerHTML = `${r.fileNames}`;
    })
    .catch(err => answEl.innerHTML = `Error: ${err}`);
  axios.post('/review', data)
    .then(r => {
      console.log(r.data);
      let str = '';
      r.data.forEach(el => {
        str = `${str}<div>${el.name}/${el.size}</div>`;
      })
      return str;
    })
    .then(r => {
      console.log('rrr', r);

      listEl.innerHTML = `${r}`;
    })
    .catch(err => answEl.innerHTML = `Error: ${err}`);

});
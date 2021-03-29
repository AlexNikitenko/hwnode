const form = document.querySelector("form");
const answEl = document.querySelector(".answ");
const listEl = document.querySelector('.files-list');
const downloadEl = document.querySelector('.dwn-link');

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
      console.log(r.data.downloadLink);
      let str = '';
      r.data.outgoingArr.forEach(el => {
        str = `${str}<div>${el.name}/${el.size}/${el.time}</div>`;
      })
      downloadEl.innerHTML = '<a href="/files.zip" download>Download Zip Archive</a>';
      return str;
    })
    .then(r => {
      console.log('result', r);

      listEl.innerHTML = `${r}`;
      
    })
    .catch(err => answEl.innerHTML = `Error: ${err}`);

});
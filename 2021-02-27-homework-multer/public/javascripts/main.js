const form = document.querySelector("form");
const answEl = document.querySelector(".answ");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  axios.post('/', data)
    .then(r => answEl.innerHTML = `Ok: ${r.data}`)
    .catch(err => answEl.innerHTML = `Error: ${err}`);
});
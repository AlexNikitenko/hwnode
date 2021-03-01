const form = document.querySelector('form');
const answEl = document.querySelector('.answ');
const countryEl = document.querySelector('.country-card');

form.addEventListener('change', ev => {
  ev.preventDefault();
  const data = new FormData(form);
  axios.post('/', data)
    .then(r => {
      console.log(r.data);
      let str = '';
       r.data.forEach(el => {
        str = `${str}
        <div class="${el.name}">
        ${el.name}
          <img class="flag" src="${el.flag}">
          <div class="cats">${el.cats}
          </div>
        </div>
        `;
      })
      countryEl.innerHTML = str;

    })
    
    // countryEl.innerHTML = `${r.data}`)
    .catch(e => answEl.innerHTML = `Error: ${e}`);
});
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
        let str2 = '';

        el.catsArr.forEach(elem => str2 = `${str2}
        <div class="cat">${elem.name}
          <img src="${elem.imgUrl}">
        </div>
        `)

        str = `${str}
        <div class="country">
        <div class="country-name">${el.name}</div>
          <img class="flag" src="${el.flag}">
          <div class="cats">${str2}
          </div>
        </div>
        `;
      })
      countryEl.innerHTML = str;

    })

    // countryEl.innerHTML = `${r.data}`)
    .catch(e => answEl.innerHTML = `Error: ${e}`);
});
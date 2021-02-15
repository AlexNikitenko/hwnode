const dogsEl = document.querySelectorAll('.breed');

dogsEl.forEach(el => {
  el.addEventListener('click', ev => {
    console.log(ev.target.classList[1]);
    axios.get(`https://dog.ceo/api/breed/${ev.target.classList[1]}/images/random`)
    .then(r => {
      ev.target.innerHTML = `<img src="${r.data.message}">`;
    });
  });
});


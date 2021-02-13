// const mainEl = document.querySelector('.main');

// mainEl.addEventListener('click', ev => {
//   if (ev.target.classList.contains('breed')) {
//     ev.target.classList.add('hide');
//     const breedNameArr = ev.target.className.split(' ');
//     const breedName = breedNameArr[1];
//     const imgEl = document.querySelector(`.breed-img-${breedNameArr[1]}`);
//     imgEl.classList.remove('hide');

//     console.log(breedName);
//   }
// })

const dogsEl = document.querySelectorAll('.breed');

dogsEl.forEach(el => {
  el.addEventListener('click', ev => {
    console.log(ev.target.classList[1]);
    // let breedEl = document.querySelector(`.breed ${ev.target.classList[1]}`);
    let breedEl = document.querySelector(`.breed-img-${ev.target.classList[1]}`);
    // breedEl.innerHtml = `
    // <div class="breed ${ev.target.classList[1]}">
    //   <img class="breed-img-${ev.target.classList[1]}" src="https://dog.ceo/api/breed/${ev.target.classList[1]}/images/random">
    // </div>
    // `;
    breedEl.innerHtml = `
      <img class="breed-img-${ev.target.classList[1]}" src="https://dog.ceo/api/breed/${ev.target.classList[1]}/images/random">
    `;
  });
});


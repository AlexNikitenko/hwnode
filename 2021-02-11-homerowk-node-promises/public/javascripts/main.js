const mainEl = document.querySelector('.main');

mainEl.addEventListener('click', ev => {
  if (ev.target.classList.contains('breed')) {
    ev.target.classList.add('hide');
    const breedNameArr = ev.target.className.split(' ');
    const breedName = breedNameArr[1];
    const imgEl = document.querySelector(`.breed-img-${breedNameArr[1]}`);
    imgEl.classList.remove('hide');

    console.log(breedName);
  }
})
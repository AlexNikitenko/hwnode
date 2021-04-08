const formEl = document.querySelector('.main-form');
const loginEl = document.querySelector('.login');
const qtyEl = document.querySelector('.quantity');
const emailEl = document.querySelector('.email');

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  axios.post('/', data)
    .then(r => {
      r.data.forEach(el => {
        if (el === '/login') {
          loginEl.classList.add('red-border');
        }
        if (el === '/quantity') {
          qtyEl.classList.add('red-border');
        }
        if (el === '/email') {
          emailEl.classList.add('red-border');
        }
      })
    })
    .catch(err => console.log('ERROR: ', err);
});
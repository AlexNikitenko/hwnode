
const selectEl = document.querySelector('.breed-list');

selectEl.addEventListener('change', (event) => {
  history.pushState(null, '',`/${event.target.value}`);
  location.assign(`/${event.target.value}`);
});

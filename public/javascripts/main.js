
const selectEl = document.querySelector('.breed-list');

selectEl.addEventListener('change', (event) => {
  location.assign(`/${event.target.value}`);
});

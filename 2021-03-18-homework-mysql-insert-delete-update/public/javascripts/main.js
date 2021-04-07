const formSelect = document.querySelector('#form-select');
const formInsert = document.querySelector('#form-insert');
const formDelete = document.querySelector('#form-delete');
const answEl = document.querySelector('.output');
const btnSubmit = document.querySelector('.btn-submit');

const thenData = (r) => {
  const str = r.data.reduce((str, el) => {
    return `${str}<li class="car-row">
                    <div class="mmy"><span>${el.id} ${el.make} ${el.model} ${el.year}</span>
                      <button type="button" class="btn-delete" id="${el.id}"></button>
                      <button type="button" class="btn-edit" id="edit-${el.id}"></button>
                    </div>
                  </li><br>`;
  }, '');
  answEl.innerHTML = str;
}

formSelect.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const data = new FormData(formSelect);
  axios.post('/years', data)
    .then(thenData)
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});

formInsert.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const data = new FormData(formInsert);
  axios.post('/insert', data)
    .then(thenData)
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});

formDelete.addEventListener('submit', (ev) => {
  ev.preventDefault();

  const data = new FormData(formDelete);
  axios.post('/delete', data)
    .then(thenData)
    .catch(err => answEl.innerHTML = `Error: ${err}`)
});

answEl.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (ev.target.classList.contains('btn-delete')) {
    const rowId = {
      id: ev.target.id,
    };
    axios.post('/delete', rowId)
      .then(thenData)
      .catch(err => answEl.innerHTML = `Error: ${err}`)
  };

  console.log('div>>>', ev.target.parentNode);
  const rowStr = ev.target.parentNode; ///Block with MMY content
  const rowContent = rowStr.firstChild.textContent; //MMY Content
  const rowArr = rowContent.split(' '); ///Array with Id, Make, Model, Year
  const mainRowEl = rowStr.parentNode; //Up to LVL Higher, to edit our li

  if (ev.target.classList.contains('btn-edit')) {
    mainRowEl.innerHTML = `
    <form id="form-update">
        <input type="text" name="make" value="${rowArr[1]}" class="edit-make">
        <input type="text" name="model" value="${rowArr[2]}" class="edit-model">
        <input type="text" name="year" value="${rowArr[3]}" class="edit-year">
        <input type="text" name="id" value="${rowArr[0]}" class="edit-id" readonly hidden>
        <button type="submit" value="UPDATE" class="btn-update">UPDATE</button>
    </form>
    `;
    const updatedMake = document.querySelector('.edit-make');
    const updatedModel = document.querySelector('.edit-model');
    const updatedYear = document.querySelector('.edit-year');
    const btnUpdate = document.querySelector('.btn-update');

    btnUpdate.addEventListener('click', (ev) => {
      ev.preventDefault();

      const updatedData = {
        make: updatedMake.value,
        model: updatedModel.value,
        year: updatedYear.value,
        id: rowArr[0],
      };

      axios.post('/update', updatedData)
        .then(thenData)
        .catch(err => answEl.innerHTML = `Error: ${err}`);
    })
  };
});

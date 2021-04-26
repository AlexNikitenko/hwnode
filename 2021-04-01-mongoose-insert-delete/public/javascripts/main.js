const formEl = document.querySelector('#form1');
const answEl = document.querySelector('.output');
const btnDelete = document.querySelector('.btn-delete');
const usersEl = document.querySelector('.all-users');


const thenData = (r) => {
  const str = r.data.usersArr.reduce((str, el) => {
    return `${str}<li>
                    <div class="user-row">
                    <a href="#" id="update-${el._id}" class="link-update">${el.name}
                    </a><button type="button" class="btn-delete" id="${el._id}"></button>
                    </div><br>
                    <div id="info-${el._id}">
                    birthday - ${el.birth} / experience - ${el.exp} / role - ${el.role} / salary - ${el.salary}
                    </div>
                  </li>`
  }, '');
  usersEl.innerHTML = str;
}

formEl.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(formEl);
  axios.post('/addUser', data)
    .then(thenData)
    .catch(err => answEl.innerHTML = `ERROR: ${err}`);
});

usersEl.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (ev.target.classList.contains('btn-delete')) {
    const rowId = {
      id: ev.target.id,
    };
    axios.post('/del', rowId)
      .then(thenData)
      .catch(err => answEl.innerHTML = `Error: ${err}`)
  };

  if (ev.target.classList.contains('link-update')) {

    const updateId = ev.target.id.split('-')[1];
    const userEl = document.querySelector(`#info-${updateId}`);
    const userInfo = userEl.innerText; //Получаем текстом информацию о редактируемом юзере
    const userInfoArr = userInfo.split(' / ').map(el => el.split(' - ')[1]); //Получаем массив элементов для данных формы

    console.log('UPDATED ID TEXT:>>>', userInfoArr);

    formEl.innerHTML = `
    <input type="text" name="name" value="${ev.target.innerText}" class="input-name">
    <input type="date" name="birth" value="${moment(userInfoArr[0]).format('YYYY-MM-DD')}" class="input-birth">
    <input type="text" name="exp" value="${userInfoArr[1]}" class="input-exp">
    <select name="role" class="input-role">
      <option value="worker"${userInfoArr[2] === 'worker' ? 'selected' : ''}>worker</option>
      <option value="welder" ${userInfoArr[2] === 'welder' ? 'selected' : ''}>welder</option>
    </select>
    <input type="text" name="salary" value="${userInfoArr[3]}" class="input-salary">
    <button type="submit" class="btn-update">Update User</button>
    `;

    const inputNameEl = document.querySelector('.input-name');
    const inputBirthEl = document.querySelector('.input-birth');
    const inputExpEl = document.querySelector('.input-exp');
    const inputRoleEl = document.querySelector('.input-role');
    const inputSalaryEl = document.querySelector('.input-salary');
    const btnUpdate = document.querySelector('.btn-update');
    
    btnUpdate.addEventListener('click', (ev) => {
      ev.preventDefault();

      const updatedData = {
        id: updateId,
        name: inputNameEl.value,
        birth: inputBirthEl.value,
        exp: inputExpEl.value,
        role: inputRoleEl.value,
        salary: inputSalaryEl.value,
      };
      
      console.log('DATA to Update:>>>', updatedData);
      axios.post('/update', updatedData)
        .then(thenData)
        .catch(err => answEl.innerHTML = `Error: ${err}`);
    })
  };
});

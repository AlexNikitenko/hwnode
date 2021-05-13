const formEl = document.querySelector('.main-form');

let socket = io();

socket.on('clientsId', index => {
  console.log('Client ID>>>', index);
  if (index === 0) {
    formEl.innerHTML = `<div class="output"></div>`;
    const outputEl = document.querySelector('.output');
    socket.on('scrollValueArr', valuesArr => {
      let str = '';
      valuesArr.forEach(el => str = `${str}<div>${el}</div><br>`);
      outputEl.innerHTML = str;
      console.log('ARR>>>', str);
    });
  } else {
    formEl.innerHTML = `
    <input type="range" min="0" max="100" step="1" value="50" id="scroll">
    <span id="output-value">50</span>
    `;
    const scrollEl = document.querySelector('#scroll');
    const rangeValue = document.querySelector('#output-value');
    scrollEl.addEventListener('change', (event) => {
      event.preventDefault();
      rangeValue.innerHTML = scrollEl.value;
      
      socket.emit('scrollValue', scrollEl.value);
    });
  }
});



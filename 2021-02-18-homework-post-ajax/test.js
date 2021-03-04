const fs = require('fs');
const streamRead = fs.createReadStream('./temp/1.mp4', { highWaterMark: 100000 });

let quantity = 0;
streamRead.on('readable', function() {
  let data = streamRead.read();
  if (data) {
    console.log(quantity += 1);
  } else {
    console.log('data is full: ', data)
  };
});

streamRead.on('open', () => {
  console.log('stream Open');
});

streamRead.on('close', () => {
  console.log('stream Closed');
})

streamRead.on('end', () => {
  console.log('The End');
})
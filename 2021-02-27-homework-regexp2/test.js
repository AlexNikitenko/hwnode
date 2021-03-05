const fs = require('fs');
const os = require('os');
const { Stream } = require('stream');

const freemem = (id) => {
  console.log(`${id}: ${(os.freemem()/1024/1024/1024).toFixed(2)} Gb free`);
}

console.time('time');
freemem(1);

let str = '';

  for (let i = 0; i < 1e8; i++) {
    str = `${str}0`;
  }
  const readableStream = fs.createReadStream(str);
 
  const writeableStream = fs.createWriteStream("1.txt");
  readableStream.pipe(writeableStream);


// for (let i = 0; i < 1e8; i++) {
//     str = `${str}0`;
// }
// fs.WriteStream('1.txt', str, () => {});
// fs.writeFile('1.txt', str, () => {});

fs.stat('1.txt', (err, stats) => console.log(stats));

console.timeEnd('time');
freemem(2);
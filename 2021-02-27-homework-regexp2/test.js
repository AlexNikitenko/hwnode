const fs = require('fs');
const os = require('os');
const { Stream } = require('stream');

const freemem = (id) => {
  console.log(`${id}: ${(os.freemem()/1024/1024/1024).toFixed(2)} Gb free`);
}

console.time('time');
freemem(1);

// const streamWrite = fs.createWriteStream('1.txt');

// let chunk = '';
// for (let j = 0; j < 1e3; j++) {
//   for (let i = 0; i < 1e7; i++) {
//     chunk = `${chunk}0`;
//     }
//     streamWrite.write(chunk);
  
    
//   //   if (i % 1e7 === 0) {
//   //     fs.appendFileSync('1.txt', chunk, () => {});
//   //     chunk = '';
//   //   }
//   }
// streamWrite.end();
const chunkSize = 6400000;
let buf1 = Buffer.alloc(chunkSize, '0');

for (let j = 0; j < (1e10 / chunkSize); j++) {
  // const streamRead = fs.createReadStream('2.txt');
  // const streamWrite = fs.createWriteStream('1.txt');
  fs.appendFileSync('1.txt', buf1, () => {});
  // fs.appendFile('1.txt', buf1, () => {});
}


console.log('DATA COMP>>>', os.uptime())

fs.stat('1.txt', (err, stats) => console.log(stats));

console.timeEnd('time');
freemem(2);
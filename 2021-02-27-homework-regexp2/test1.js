const fs = require('fs');

const startTime = Date.now();
const buf1 = Buffer.alloc(10000000);

for (let j = 0; j < 1e3; j++) {
    fs.appendFile('1.txt', buf1, () => {
        if (j === 1e3 - 1) {
            const endTime = Date.now();
            const duration = (endTime - startTime) / 1000;

            console.log(`Finished in: ${duration} seconds`);
        }
    });
}
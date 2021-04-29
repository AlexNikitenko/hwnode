const jwt = require('jsonwebtoken');
const testObj = {
  name: "Alex",
  role: "student",
  profession: "full-Stack JS",
  salary: 99999,
};
const token = jwt.sign(testObj, '242242');
console.log('TOKEN>>>', token);

const decoded = jwt.verify(token, '242242');
console.log('DECODEC>>>', decoded);

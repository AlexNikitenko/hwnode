const moment = require('moment');

  const birth = '1990-06-01';
  const from = 20;
  const to = 30;
  fromNew = moment(birth).format('yyyy');
  const age = moment(birth).toNow(true);
  const ageNew = age.format('Y');
  console.log(age, ageNew);

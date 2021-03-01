// const router = require('./routes');
// const axios = require('axios');

// /* GET home page. */
// // router.get('/', function(req, res, next) {
// //   res.render('index', { title: 'Express' });
// // });

// const reqbody = 'europe';
// const url = `https://restcountries.eu/rest/v2/region/${reqbody}`;

// // const countries = axios.get(url).then(r => console.log(r.data.map(el => el.name)));
// const countriesP = axios.get(url);
// const countriesArrObj = countriesP.then(r => r.data);
// const countries = countriesArrObj.map(el => {
//   return { name: el.name, flag: el.flag };
// });

// const getCountriesArr = async (uri) => {
//   const countriesObj = await axios.get(uri);
//   return countries = countriesObj.data.map(el => {
//     return { name: el.name, flag: el.flag, code: el.alpha2Code };
//   });
// };

// getCountriesArr(url).then(r => console.log(r));



const getFileExtension = (str) => {
  // return str.match(/м[а-я]+[^ ]/gi);
  return str.match(/[а-я]ам+[^ ]/gi)
};

console.log(getFileExtension('Мама мыла раму'));
// module.exports = router;

// все слова на букву м

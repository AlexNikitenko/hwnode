const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', upload.none(), function(req, res, next) {
  
  const reqbody = req.body['region'];
  const url = `https://restcountries.eu/rest/v2/region/${reqbody}`;
  const urlCats = 'https://api.thecatapi.com/v1/breeds';


  const getCountriesArr = async (uri) => {
    const countriesObj = await axios.get(uri);
    return countries = countriesObj.data.map(el => {
      /////////////////////////////////////////
      const getCatsArr = async (urlCatsMain) => {
        const objCatsMain = await axios.get(urlCatsMain);
        const arrCatsMain = objCatsMain.data;
    
        const arrCats = arrCatsMain.map(el => {
          return new Promise((resolve, reject) => {
            if (el.image === undefined || el.image.url === undefined) {
              // console.log('get img>>>', el.id);
              axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${el.id}`)
                .then(img => {
                  resolve({
                    name: el.name,
                    countryCode: el.country_code,
                    imgUrl: img.data[0].url,
                  })
                })
                .catch(err => console.log('err>>', err));
            } else {
                resolve({
                  name: el.name,
                  countryCode: el.country_code,
                  imgUrl: el.image.url,
                });
              };
        });
      });
      // Promise.all(arrCats)
      // .then(r => r.filter(el2 => el2.countryCode === el.code))
      // .then(r => console.log('filtered cats.......', r))
      ;
      
      };
      /////////////////////////////////////////
      const newArr = getCatsArr(urlCats).then(r => r.filter(el2 => el2.countryCode === el.code))
      return { name: el.name, flag: el.flag, code: el.alpha2Code, catsArr: Promise.all(getCatsArr(urlCats)).then(r => r.filter(el2 => el2.countryCode === el.code)) };
    });
  };
  /////////////////////
  getCountriesArr(url)
  .then(r => console.log('>>>>>>>>>>>>>>>', r));
  // .then(r => res.send(r));
});



module.exports = router;

// router.post('/', upload.none(), function(req, res, next) {
  
//   const reqbody = req.body['region'];
//   const url = `https://restcountries.eu/rest/v2/region/${reqbody}`;


//   const getCountriesArr = async (uri) => {
//     const countriesObj = await axios.get(uri);
//     const arrCats = getCatsArr('https://api.thecatapi.com/v1/breeds');
//     return countries = countriesObj.data.map(el => {
      

//       return { name: el.name, flag: el.flag, code: el.alpha2Code, arrCats: arrCats.filter(el2 => el2.countryCode === el.code) };
//     });
//   };

//   getCountriesArr(url).then(r => res.send(r));

//   const getCatsArr = async (urlCatsMain) => {
//     const objCatsMain = await axios.get(urlCatsMain);
//     const arrCatsMain = objCatsMain.data;

//     const arrCats = arrCatsMain.map(el => {
//       return new Promise((resolve, reject) => {
//         if (el.image === undefined || el.image.url === undefined) {
//           console.log('get img>>>', el.id);
//           axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${el.id}`)
//             .then(img => {
//               resolve({
//                 name: el.name,
//                 countryCode: el.country_code,
//                 imgUrl: img.data[0].url,
//               })
//             })
//             .catch(err => console.log('err>>', err));
//         } else {
//             resolve({
//               name: el.name,
//               countryCode: el.country_code,
//               imgUrl: el.image.url,
//             });
//           };
//     });
//   });
//   Promise.all(arrCats).then(r => console.log(r));
//   };

//   getCatsArr('https://api.thecatapi.com/v1/breeds');
// });
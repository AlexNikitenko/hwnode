const express = require('express');
const router = express.Router();
const axios = require('axios');

//  router.get('/', async (req, res) => {
//    res.send('cats ok');
//   const urlCatsMain = 'https://api.thecatapi.com/v1/breeds';

//   const objCatsMain = await axios.get(urlCatsMain);
//   const arrCatsMain = objCatsMain.data;

//   const arrCats = arrCatsMain.map(el => {
//     return new Promise((resolve, reject) => {
//       if (el.image === undefined || el.image.url === undefined) {
//         console.log('get img>>>', el.id);
//         axios.get(`https://api.thecatapi.com/v1/images/search?breed_id=${el.id}`)
//           .then(img => {
//             resolve({
//               name: el.name,
//               countryCode: el.country_code,
//               imgUrl: img.data[0].url,
//             })
//           })
//           .catch(err => console.log('err>>', err));
//       } else {
//           resolve({
//             name: el.name,
//             countryCode: el.country_code,
//             imgUrl: el.image.url,
//           });
//         };
//      });
//  });
//  Promise.all(arrCats).then(r => console.log(r));

// });

module.exports = router;
const express = require('express');
const router = express.Router();
const axios = require('axios');
const multer = require('multer');
var upload = multer();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.post('/', upload.none(), function (req, res, next) {
  const reqbody = req.body['region'];
  const url = `https://restcountries.eu/rest/v2/region/${reqbody}`;
  const urlCats = 'https://api.thecatapi.com/v1/breeds';

  const getCountriesWithCats = async () => {
    const catsArr = await axios.get(urlCats);
    const countriesObj = await axios.get(url);

    const catsWithPhotos = await Promise.all(catsArr.data.map(el => {
      return new Promise((resolve, reject) => {
        if (el.image === undefined || el.image.url === undefined) {
          console.log('get img>>>', el.id);
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
    }));
    const countriesArr = countriesObj.data.map(el => {
      const filteredCatsArr = catsWithPhotos.filter(el2 => el2.countryCode === el.alpha2Code);
      return {
        name: el.name,
        code: el.alpha2Code,
        flag: el.flag,
        catsArr: filteredCatsArr
      };
    }).filter(el => el.catsArr[0] !== undefined);
    res.send(countriesArr);
  };

  getCountriesWithCats();

});



module.exports = router;
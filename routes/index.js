const axios = require('axios');
const express = require('express');
const router = express.Router();

const url = 'https://dog.ceo/api/breeds/list/all';
let breedsArray = [];

/* GET home page. */

router.get('/', function(req, res, next) {
  axios.get(url)
  .then(r => r.data.message)
  .then(r => Object.keys(r))
  .then(r => {
    res.render('index', { breedsArr: r,
                                   imageSrc: ''});
    breedsArray = [...r];
    })
  .catch(err => console.log('Error: ', err));
});

router.get('/:state', function(req, res, next) {
  const imageUrl = `https://dog.ceo/api/breed/${req.params.state}/images/random`;
  console.log(breedsArray);
  axios.get(imageUrl)
  .then(r => r.data.message)
  .then((r, i) => res.render('index', { breedsArr: breedsArray,
                                   imageSrc: r }))
  .catch(err => console.log('Error: ', err));
});


module.exports = router;

// const promise2000 = () => {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, 2000);
//   });
// }




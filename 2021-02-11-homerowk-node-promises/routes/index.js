const express = require('express');
const router = express.Router();
const axios = require('axios');

const url = 'https://dog.ceo/api/breeds/image/random';
let dogsArr = [];

for (let i = 0; i < 30; i++) {
  dogsArr.push(axios.get(url).then(r => {
    const obj = {};
    obj.breedUrl = r.data.message;
    obj.breed = r.data.message.split('/').slice(4).splice(0, 1).join();
    return obj;
    console.log(obj);
    }));
}

/* GET home page. */
router.get('/', function(req, res, next) {
  Promise.all(dogsArr)
  .then(r => {
    res.render('index', { breedsArr: r })
    console.log(r);
    })
  .catch(err => console.log('Err:', err));
});

module.exports = router;

// 1) массив объектов "ссылка на картинку"+"порода" отправить на фронт. 
// На фронте при нажатии на div с надписью породы должна отобразиться фотка собаки этой породы
// 2) Кроме этих свойств в отправляемом объекте указать высоту и ширину, полученную по
//  ссылке на картинку (если будет большая, уменьшить пропроционально до 200px). Объект отправить
//   на фронт и отобразить как в предыдущем задании.
// 3) На фронте при нажатии на картинку отображать новую той же породы, высоту картинки оставить
//  изначальной

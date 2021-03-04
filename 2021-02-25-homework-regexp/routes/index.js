const express = require('express');
const router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });



});


module.exports = router;

  axios.get('https://dou.ua/')
  .then(r => {
    // console.log(r);
    const reg = /jpeg$/gi;
    const out = r.data.match(reg);

    console.log('OUT>>>', out);
  
  })
;

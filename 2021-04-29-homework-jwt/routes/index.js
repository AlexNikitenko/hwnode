const { default: axios } = require('axios');
var express = require('express');
var router = express.Router();
const multer = require('multer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/sendData', upload.none(), async function(req, res, next) {
  // const result = await axios.get('url');
  res.render('index');
});

module.exports = router;

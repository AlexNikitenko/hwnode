const {
  default: axios
} = require('axios');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/sendData', upload.none(), function (req, res, next) {
  const result = req.body.input1;
  console.log('Body>>>', req.body);
  res.json({message: result});
});

module.exports = router;

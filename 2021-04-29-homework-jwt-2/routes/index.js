const {
  default: axios
} = require('axios');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const fs = require('fs');
const jwt = require('jsonwebtoken');



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/token', function (req, res, next) {
  const getLocalPass = fs.readFileSync('password.txt');
  console.log('Local pass', getLocalPass);
  const newObj = {
    message: 'Data is rejected'
  }
  const token = jwt.sign(newObj, getLocalPass);
  console.log('TOKEN>>>', token);
  res.json({
    'message': token
  });
});

router.post('/sendData', upload.none(), async function (req, res, next) {
  console.log('BODY>>>', req.body);

  const {
    passwlocal,
    passwremote,
    urlremote
  } = req.body;

  fs.writeFileSync('password.txt', passwlocal);

  await axios.get(urlremote)
    .then(r => {
      console.log('2Server', r.data);
      const decoded = jwt.verify(r.data.message, passwremote);
      res.send(decoded);
      console.log('DECODED>>>', decoded);
    })
    .catch(err => console.log(err));

});

module.exports = router;

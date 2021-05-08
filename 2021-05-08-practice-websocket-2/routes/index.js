const {
  default: axios
} = require('axios');
var express = require('express');
var router = express.Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer({
  limits: {
    fileSize: 10000000000,
  }
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.post('/', upload.single('filename'), async (req, res) => {
  const file = req.file;
  console.log('>>>', file.originalName);

  const writeStream = fs.createWriteStream(`uploads/${file.originalName}`);

  await file.stream.pipe(writeStream);

  res.send('file was sent');
});

module.exports = router;

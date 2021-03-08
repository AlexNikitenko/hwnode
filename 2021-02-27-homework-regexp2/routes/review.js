const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/review', upload.none(), function (req, res, next) {
  console.log('Body:', req.body);
  fs.readdir('./uploads', function(err, items) {
    console.log('Files in path', items);
    res.send({ fileNames: items });
  });
});

module.exports = router;

  // const writerStream = fs.createWriteStream('main.log');
  // newArr.forEach(el => fs.writeFile(`${el}\n\n`,'utf-8'));


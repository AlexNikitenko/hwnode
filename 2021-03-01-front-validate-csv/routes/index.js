const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage ({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    cb(null, '1.csv');
  }
});

const upload = multer({
  storage: storage,
});

const cpUpload = upload.fields([
  {
     name: 'date', 
     maxCount: 1 
  },
  { 
    name: 'author', 
    maxCount: 1 
  },
  { 
    name: 'article', 
    maxCount: 1 
  }
]);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', cpUpload, function (req, res, next) {
  console.log('BODYYY>>>', req.body);
  res.send('form send');
  fs.appendFileSync('./files/1.csv', `${req.body.date}.${req.body.author}.${req.body.article}\n`);
});

router.get('/files/result.csv', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../files/1.csv'));
});

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './2021-03-08')
  },
  filename: function (req, file, cb) {
    cb(null, `${req.body.filename}.${file.originalname.split('.').pop()}`)
  }
})

const upload = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', upload.fields([{ name: 'file', maxCount: 1 }, { name: 'filename', maxCount: 1 }]), (req, res) => {
  res.send('form send');
});

module.exports = router;

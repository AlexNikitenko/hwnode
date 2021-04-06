const express = require('express');
const router = express.Router();
const multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const fsProm = require('fs').promises;
const path = require('path');
const {
  format
} = require('path');
const AdmZip = require('adm-zip');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`)
  }
})

const upload = multer({
  storage: storage
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/review', function (req, res, next) {
  res.render('index');
});

router.post('/', upload.array('files'), (req, res) => {
  const newArr = req.files.map(el => `${moment().format('YYYY-MM-DD hh:ss')}/${el.originalname}/${el.size}`)

  newArr.forEach(async (el) => {
    let str = '\n';
    str = `${str}${el}`;
    await fs.appendFile('main.log', str, (err) => console.log(err));
  });
  fs.appendFile('main.log', `\n`, (err) => console.log(err));

  res.send('form send');
});

router.post('/review', upload.array('files'), (req, res) => {
  const dateFrom = moment(req.body['date-from']).format('YYYY-MM-DD hh:ss');
  const dateTo = moment(req.body['date-to']).format('YYYY-MM-DD hh:ss');

  const getListFiles = async (dir) => {
    const filesName = await fsProm.readdir(dir);

    const filesProm = filesName.map(el => {
      return fsProm.stat(`${dir}/${el}`).then(bigObj => {
        return {
          name: el,
          size: bigObj.size,
          time: moment(bigObj.birthtime).format('YYYY-MM-DD hh:ss'),
        };
      });
    });

    const resultArr = await Promise.all(filesProm);
    const filteredArr = resultArr.filter(el => {

      const timeFormat = moment(el.time).format('YYYY-MM-DD hh:ss');
      const outgoingObj = moment(timeFormat).isBetween(dateFrom, dateTo);
      return outgoingObj;
    });

    const zip = new AdmZip();
    
    filteredArr.forEach(el => {
      console.log('Files to Zip:', `../uploads/${el.name}`);
      zip.addLocalFile(path.join(__dirname, `../uploads/${el.name}`));
      zip.writeZip(path.join(__dirname, "../files.zip"));
    })

    res.send(filteredArr);
  };

  getListFiles(path.join(__dirname, '../uploads'));
  console.log('Body>>>', dateFrom, dateTo);

});

router.get('/files.zip', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../files.zip'));
});


module.exports = router;

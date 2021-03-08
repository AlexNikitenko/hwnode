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

router.get('/review', function(req, res, next) {
  res.render('index');
});

router.post('/', upload.array('files'), (req, res) => {
  console.log(req.files);
  const newArr = req.files.map(el => `${moment().format('YYYY-MM-DD hh:ss')}/${el.originalname}/${el.size}`)
  
  newArr.forEach(async (el) => {
    let str = '\n';
    str = `${str}${el}`;
    return await fs.appendFile('main.log', str, (err) => console.log(err));
  });
  fs.appendFile('main.log', `\n`, (err) => console.log(err));

  res.send('form send');
});

router.post('/review', upload.array('files'), (req, res) => {
  console.log('Body111:', req.body);
  console.log('Files req:', req.files);
  fs.readdir('./uploads', function(err, items) {
    console.log(items);
    const stats = fs.stat(items[0], () => {});
    console.log('stats:', stats);

    const filesArr = items.map(el => {
      return {
        name: el,
        size: '',
      }
    });
    res.send(filesArr);
  });
});

// router.post('/review', upload.none(), (req, res) => {
//   console.log('Body111:', req.body);
//   fs.readdir('./uploads', function(err, items) {
//     console.log(items);
//     const filesArr = items.map(el => {
//       return {
//         name: el,
//       }
//     });
//     res.send(filesArr);
//   });
// });

module.exports = router;

  // const writerStream = fs.createWriteStream('main.log');
  // newArr.forEach(el => fs.writeFile(`${el}\n\n`,'utf-8'));


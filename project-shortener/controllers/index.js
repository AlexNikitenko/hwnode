const Urls = require('../model/Urls');

const crypto = require('crypto');

const showIndex = (req, res) => {
  res.render('index');
};

const addNewUrl = async (req, res) => {
  const newUrl = new Urls(req.body);
  let tempId = '';
  console.log('REQ-Body>>>', req.body);
  newUrl.save(function (err, data) {
    console.log('DB data >>>', data);
    if (err) {
      res.send(`not correct data`);
      console.log('ERR>>>>', err);
    } else {
      tempId = data._id;
      data.shortUrl = `http://127.0.0.1:3000/${generateShortUrl()}`;
      res.send({ newUrl: data.shortUrl });
    }
  });
  // console.log('NEW>>>', req.bodydata);
  // res.send({ newUrl: data.shortUrl })
  // res.sendStatus(200);
  
};

const generateShortUrl = (length = 6) => {
  const uppercase = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '23456789';
  const all = uppercase + lowercase + numbers;
  let newLink = '';
  for (let i = 0; i < length; i++) {
    const randomNumber = crypto.randomInt(all.length);
    newLink += all.charAt(randomNumber);
  };
  return newLink;
};

module.exports = {
  addNewUrl,
  showIndex,
};
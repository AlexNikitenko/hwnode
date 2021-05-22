const Urls = require('../model/Urls');

const crypto = require('crypto');

const showIndex = (req, res) => {
  res.render('index');
};

const addNewUrl = async (req, res) => {
  const newUrl = new Urls(req.body);
  let tempId = '';

  const randomUrl = generateShortUrl();
  newUrl.shortUrl = `http://127.0.0.1:3000/${randomUrl}`;

  console.log('REQ-Body>>>', req.body);
  newUrl.save(function (err, data) {
    console.log('DB data >>>', data);
    if (err) {
      res.send(`not correct data`);
      console.log('ERR>>>>', err);
    } else {
      tempId = data._id;
      res.send({ urlId: tempId, oldUrl: data.longUrl, newUrl: data.shortUrl });
    }
  });
  
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

const getRedirect = async (req, res) => {
  const { newUrl } = req.params;
  const { longUrl } = await Urls.findOne({ shortUrl: `http://127.0.0.1:3000/${newUrl}` });
  console.log('New2>>>', newUrl);
  console.log('RB2>>>', longUrl);
  res.redirect(longUrl);
};

module.exports = {
  addNewUrl,
  showIndex,
  getRedirect,
};
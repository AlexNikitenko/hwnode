const Urls = require('../model/Urls');

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
      console.log('DATA>>>', data);
    }
  });
  const result = await Urls.find({});

  // res.send({ newUsrlId: tempId, urlsArr: result })
  res.sendStatus(200);
  
};

module.exports = {
  addNewUrl,
  showIndex,
};
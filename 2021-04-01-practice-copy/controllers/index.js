const Article = require('../model/Articles/');


const showIndex = (req, res) => {
  res.render('index');
};

const addNewArticle = (req, res) => {

  const strTags = req.body.tags;
  const tagsArr = strTags.split(',').map(el => el.trim());
  req.body.tags = tagsArr;

  const newArticle = new Article(req.body);

  newArticle.save(function (err, data) {
    console.log('DB data >>>', data);
    if (err) {
      res.send(`not correct data`);
      console.log('>>>>', err);
    } else {
      res.send(data._id);
    }
  });

};

const showArticleById = async (req, res) => {
  const {
    id
  } = req.query;
  if (id.match(/^[0-9a-fA-F]{24}$/)) {
    res.json({
      message: 'missing id in DB'
    });
  } else {
    try {
      const article = await Article.findById(id);
      console.log('article>>>', article);
      if (!article) {
        res.json({
          message: "article not found"
        });
      } else {
        res.json(article);
      }
    } catch (err) {
      res.json({
        message: `id ${err.value} not found`
      });
      console.log('ERROR>>>', err);
    }
  };
};

const getUserByName = async (searchName) => {
  const user = await Article.findOne( { name: `${searchName}` });
  if (!user) {
    res.json({ message: "user not found"});
  } else {
    res.json(user);
  }
};

module.exports = {
  addNewArticle,
  showArticleById,
  showIndex,
};
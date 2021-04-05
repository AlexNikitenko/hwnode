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
    if (err) throw err;
    res.sendStatus(200);
  });
};

// const addNewArticle = (req, res) => {
//   const newArticle = new Article({
//     title: 'Troubleshooting',
//     article: `The kerberos package is a C++ extension that requires a build environment to be installed on your system. 
//     You must be able to build Node.js itself in order to compile and install the kerberos module. Furthermore, the kerberos
//     module requires the MIT Kerberos package to correctly compile on UNIX operating systems. Consult your UNIX operation 
//     system package manager for what libraries to install.`,
//     tags: ['nodeJS', 'mongoDB', 'mongoose'], 
//     date: 04-01-2021,
//   });

//   newArticle.save(function (err, data) {
//     if (err) throw err;
//     res.sendStatus(200);
//   });
// };

module.exports = {
  addNewArticle,
  showIndex,
};
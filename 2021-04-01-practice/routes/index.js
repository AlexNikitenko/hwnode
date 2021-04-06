var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();

const controllers = require('../controllers');

/* GET home page. */
router.get('/', controllers.showIndex);

router.post('/addArticle', upload.none(), controllers.addNewArticle);

router.get('/article', controllers.showArticleById);

module.exports = router;

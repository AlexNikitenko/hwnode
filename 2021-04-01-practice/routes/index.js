var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const ajv = require('ajv');

const controllers = require('../controllers');

const validator = (req, res, next) => {
  const ajv = new Ajv();

  const schema = JSON.parse(`{
    "type": "Object",
    "properties": {
      "title": {
        "type": "string",
        "minLength": 3,
        "maxLength": 9,
        "pattern": "[a-zA-Z0-9]"
      },
      "date": {
        "type": "string",
        "minLength": 10,
        "maxLength": 10,
        "pattern": "[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])",
      }
    }
  }`);
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    console.log('not valid >>>', validate.errors)
  } else {
    next();
  };
};

/* GET home page. */
router.get('/', controllers.showIndex);

router.post('/addArticle', upload.none(), controllers.addNewArticle);

router.get('/article', controllers.showArticleById);

module.exports = router;

var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const Ajv = require('ajv');

const validator = (req, res, next) => {
  const ajv = new Ajv();

  const schema = {
    type: 'object',
    properties: {
      foo: {type: 'integer'},
      bar: {type: 'string'}
    },
    required: ['foo'],
    additionalProperties: false.
  };

  const validate = ajv.compile(schema);
  const valid = validate(req.data);
  if (!valid) {
    console.log(validate.errors);
  } else {
    next();
  };
};



const controllers = require('../controllers');

/* GET home page. */
router.get('/', controllers.showIndex);

router.post('/addArticle', upload.none(), controllers.addNewArticle);

router.get('/article', controllers.showArticleById);

module.exports = router;

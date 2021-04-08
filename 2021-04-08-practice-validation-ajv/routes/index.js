var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();
const Ajv = require('ajv');

const validator = (req, res, next) => {
  const ajv = new Ajv({allErrors: true});

  const schema = {
    "type": "object",
    "properties": {
      "login": {
        "type": "string",
        "minLength": 4,
        "pattern": "[a-zA-Z0-9]",
      },
      "quantity": {
        "type": "string",
        "minLength": 1,
        "pattern": "[0-9]",
      },
      "email": {
        "type": "string",
        "minLength": 5,
        "pattern": "[\S+@\S+\.\S+]",
      }
    },
  };

  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    console.log('Errors of Validation:', validate.errors);
    const errorsArr = validate.errors.map(el => {
      return el.instancePath;
    });
    const uniqueErrorsArr = errorsArr.filter((el,i) => errorsArr.indexOf(el) === i);
    console.log('resultate,', uniqueErrorsArr);
    res.send(uniqueErrorsArr);
  } else {
    next();
  };
};

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index');
});

router.post('/', upload.none(), validator, (req, res) => {
  console.log('Body>>>', req.body);
});

module.exports = router;

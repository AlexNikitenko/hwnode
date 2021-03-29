var express = require('express');
var router = express.Router();
const controllers = require('../controllers/');

/* GET home page. */
router.get('/', controllers.getIndexPage);
router.post('/', controllers.uploadFields, controllers.getFormYears);

module.exports = router;

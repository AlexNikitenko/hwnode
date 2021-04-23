var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer();

const controllers = require('../controllers');

/* GET home page. */
router.get('/', controllers.showIndex);

router.post('/addUser', upload.none(), controllers.addNewUser);

router.get('/user', controllers.showUserById);

module.exports = router;

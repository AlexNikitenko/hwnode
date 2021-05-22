const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();

const controllers = require('../controllers');

/* GET home page. */

router.get('/', controllers.showIndex);

router.post('/addUrl', upload.none(), controllers.addNewUrl);

// router.get('/user', controllers.showUserById);

// router.post('/del', upload.none(), controllers.delUser);

// router.post('/update', upload.none(), controllers.updateUser);

module.exports = router;

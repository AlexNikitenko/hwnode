const express = require('express');
const router = express.Router();
const controllers = require('../controllers/');
const multer = require('multer');
const upload = multer();

/* GET home page. */
router.get('/', controllers.getIndexPage);
router.post('/years', upload.none(), controllers.getFormYears);

module.exports = router;

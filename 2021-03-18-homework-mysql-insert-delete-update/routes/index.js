const express = require('express');
const router = express.Router();
const controllers = require('../controllers/');
const multer = require('multer');
const upload = multer();

/* GET home page. */
router.get('/', controllers.getIndexPage);
router.post('/years', upload.none(), controllers.getFormYears);
router.post('/insert', upload.none(), controllers.insertCar);
router.post('/delete', upload.none(), controllers.deleteCar);
router.post('/update', upload.none(), controllers.updateCar);

module.exports = router;

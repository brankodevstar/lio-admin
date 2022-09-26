const router = require('express').Router();
const uploadController = require('../controllers/uploadController');

router
    .route('/')
    .post(uploadController.upload);

router
    .route('/:filepath')
    .get(uploadController.download);

module.exports = router;
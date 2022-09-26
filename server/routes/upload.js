const router = require('express').Router();
const uploadController = require('../controllers/uploadController');

router
    .route('/')
    .post(uploadController.uploadFiles);

module.exports = router;
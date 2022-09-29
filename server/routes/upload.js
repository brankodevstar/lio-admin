const router = require('express').Router();
const uploadController = require('../controllers/uploadController');
const uploadPath = process.env.UPLOAD_PATH;
var multer = require("multer")
var upload = multer({ dest: './server/' + uploadPath })

router
    .route('/')
    .post(upload.single("file"), uploadController.upload);

router
    .route('/:filepath')
    .get(uploadController.download);

module.exports = router;
const router = require("express").Router();
const excelController = require('../controllers/excelController');
const uploadPath = process.env.UPLOAD_PATH;
var multer = require("multer");

var storage = multer.diskStorage({
    storage: function (req, file, cb) {
        cb(null, "./server/" + uploadPath);
    },
    filename: function (req, file, cb) {
        let uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length,
        );
        cb(null, file.fieldname + "_" + uniqueSuffix + ext);
    },
});

var upload = multer({
    storage: storage,
});

router.route("/").post(upload.single('file'), excelController.importExcel);

module.exports = router;

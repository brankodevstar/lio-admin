const router = require("express").Router();
const uploadController = require("../controllers/uploadController");
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
    // dest: "./server/" + uploadPath,
});

router.route("/").post(upload.single("file"), uploadController.upload);

router.route("/:filepath").get(uploadController.download);

module.exports = router;

const util = require('util');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const config = require('../config');

const storage = new GridFsStorage({
    url: config.mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const match = ['image/png', 'image/jpg'];
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()} - ${file.originalname}`;
            return filename;
        }

        return {
            bucketName: config.imgBucket,
            filename: `${Date.now()} - ${file.originalname}`
        };
    }
});

const uploadFiles = multer({ storage: storage }).single('file');
const uploadFilesMiddleware = util.promisify(uploadFiles);

module.exports = uploadFilesMiddleware;
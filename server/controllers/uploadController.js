const Crypto = require('crypto');
const config = require('../config');

const uploadPath = config.uploadPath;

const upload = async (req, res) => {
    try {
        if (req.files && Object.keys(req.files).length !== 0) {
            const uploadedFile = req.files.file;

            const [pureName, extension] = uploadedFile.name.split('.');

            // const encryptedPureName = Crypto.randomBytes(20).toString('base64').slice(0, 20);

            const encryptedPureName = 'lio-file-' + Date.now();

            const encryptedFileName = encryptedPureName + '.' + extension;

            const path = process.cwd() + '/server' + uploadPath + encryptedFileName

            uploadedFile.mv(path, function (err) {
                if (err) {
                    console.log('upload failed error ==> ', err);
                    res.send('Failed !!!');
                } else {
                    res.send({
                        filename: encryptedFileName,
                        message: 'Successfully Uploaded!',
                        success: true
                    });
                }
            })
        }
    } catch (error) {
        return res.send({
            message: `Error when trying upload image: ${error}`
        });
    }
};

const download = async (req, res) => {
    const path = process.cwd() + '/server' + uploadPath + req.params.filepath
    res.sendFile(path);
}

module.exports = { upload, download };
const config = require('../config');

const uploadPath = config.uploadPath;

const upload = async(req, res) => {
    console.log(req.files);
    try {
        console.log('upload');
        if (req.files && Object.keys(req.files).length !== 0) {
            console.log(req.files.file);
            const uploadedFile = req.files.file;

            console.log(uploadedFile);

            console.log('uploadedPath', uploadPath + uploadedFile.name);

            console.log(process.cwd());

            const path = process.cwd() + '/server' + uploadPath + uploadedFile.name

            console.log(path);

            uploadedFile.mv(path, function(err) {
                if (err) {
                    res.send('Failed !!!');
                } else {
                    console.log(path);
                    res.send('Successfully Uploaded!')
                }
            })
        }
    } catch (error) {
        return res.send({
            message: `Error when trying upload image: ${error}`
        });
    }
};

const download = async(req, res) => {
    const path = process.cwd() + '/server' + uploadPath + req.params.filepath
    res.sendFile(path);
}

module.exports = { upload, download };
const { uploadFile, getFileStream } = require("./s3");
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const upload = async (req, res) => {
    try {
        // res.send({
        //     filename: req.file.filename,
        //     message: "Successfully Uploaded!",
        //     success: true,
        // });
        const result = await uploadFile(req.file);

        //Deleting from local if uploaded in S3 bucket
        await unlinkFile(req.file.path);
        res.send({
            success: true,
            message: "Successfully Uploaded!",
            filename: req.file.filename,
            originalname: req.file.originalname,
        });
    } catch (error) {
        return res.send({
            message: `Error when trying upload image: ${error}`,
        });
    }
};

const download = async (req, res) => {
    try {
        const key = req.params.filepath;
        const readStream = getFileStream(key);
        readStream
            .on("error", (err) => {
                console.log("error occured ", err);
            })
            .pipe(res);
    } catch (error) {
        return res.send({
            message: `Error when trying upload image: ${error}`,
        });
    }
    // const path = process.cwd() + "/server" + uploadPath + req.params.filepath;
    // res.sendFile(path);
};

module.exports = { upload, download };

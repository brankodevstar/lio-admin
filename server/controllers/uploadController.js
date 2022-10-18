const uploadPath = process.env.UPLOAD_PATH;

const upload = async (req, res) => {
    try {
        res.send({
            filename: req.file.filename,
            message: "Successfully Uploaded!",
            success: true,
        });
    } catch (error) {
        return res.send({
            message: `Error when trying upload image: ${error}`,
        });
    }
};

const download = async (req, res) => {
    const path = process.cwd() + "/server" + uploadPath + req.params.filepath;
    res.sendFile(path);
};

module.exports = { upload, download };

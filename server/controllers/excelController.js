const { uploadFile, getFileStream } = require("./s3");
const excelToJson = require('convert-excel-to-json');
const csvtojson = require('csvtojson');
const userModel = require('../models/Users');
const fs = require("fs");
const util = require("util");
const unlinkFile = util.promisify(fs.unlink);

const importExcel = async (req, res) => {
    try {
        console.log('importExcel function');
        const result = await uploadFile(req.file);
        console.log('result = ', result);
        // csvtojson().fromFile(result.Location).then(source => {
        //     console.log('source', source);
        // })
        const excelJson = await csvtojson().fromFile(result.Location);
        console.log('excelJson', excelJson);
        await unlinkFile(req.file.path);
    } catch (error) {
        return res.send({
            message: `Error when trying upload image: ${error}`,
        });
    }
};

module.exports = { importExcel };

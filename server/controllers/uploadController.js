// https://www.bezkoder.com/node-js-upload-store-images-mongodb/

const uploadMiddleware = require('../middleware/upload');
const config = require('../config');

const MongoClient = require('mongodb').MongoClient;
const GridFSBucket = require('mongodb').GridFSBucket;

const mongoURI = config.mongoURI;

const storageUrl = 'http://localhost:4000/files/';

const mongoClient = new MongoClient(mongoURI);

const uploadFiles = async(req, res) => {
    try {
        await uploadMiddleware(req, res);

        if (req.file === undefined) {
            return res.send({
                message: 'You must select a file',
            });
        }

        if (res.status(200)) {
            console.log(res);
        }

        return res.status(200).send({
            message: 'File has been uploaded',
        });
    } catch (error) {
        return res.send({
            message: `Error when trying upload image: ${error}`
        });
    }
};

module.exports = { uploadFiles };
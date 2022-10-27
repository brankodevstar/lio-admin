const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

//upload file to s3
const uploadFile = (file) => {
    const fileStream = fs.createReadStream(file.path);

    const uploadStream = {
        Bucket: bucketName,
        Body: fileStream,
        Key: file.filename,
    };

    return s3.upload(uploadStream).promise();
};

//download file from s3
const getFileStream = (fileKey) => {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    };
    return s3.getObject(downloadParams).createReadStream();
};

module.exports = { uploadFile, getFileStream };

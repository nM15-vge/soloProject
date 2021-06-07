const AWS = require('aws-sdk');
const throughLensBucket = "throughlensbucket";

const multer = require("multer");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

const singlePublicImageUpload = async file => {
    const { originalname, mimetype, buffer } = await file;
    const path = require("path");

    const Key = new Date().getTime().toString()+path.extname(originalname);
    const uploadParams = {
        Bucket: throughLensBucket,
        Key,
        Body: buffer,
        ACL: "public-read"
    };
    const result = await s3.upload(uploadParams).promise();

    return result.Location;
};

const multiplePublicImageUpload = async files => {
    return await Promise.all(files.map(file => singlePublicImageUpload(file)));
};

const storage = multer.memoryStorage({
    destination: function( req, file, callback ){
        callback(null, "");
    },
});

const singleMulterUpload = nameOfKey => multer({ storage: storage}).single(nameOfKey);
const mulitpleMulterUpload = nameOfKey => multer({ storage: storage }).array(nameOfKey);

module.exports = {
    s3,
    singlePublicImageUpload,
    multiplePublicImageUpload,
    singleMulterUpload,
    mulitpleMulterUpload
};

const client = require('../config/dbconfig');
const fs = require("fs");
const awsConfig = require('../config/awsConfig');
const crypto = require("crypto");

const getAllPdf = async (userId) => {
    console.log(userId)
    const result = await client.query('select * from users_document t WHERE t.user_id = $1', [userId]);
    return result.rows;
}

const saveFile = async (fileName, userId) => {
    console.log(fileName)
    console.log(userId)
    const result = await client.query('INSERT INTO users_document (document_id,user_id) VALUES ($1,$2)', [fileName, userId]);
    return result;
}

const getFile = async (fileName) => {
    const params = {
        Bucket: awsConfig.getBucketName(),
        Key: fileName
    };
    awsConfig.s3.getObject(params, function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
       return data.Body;
    });
};

const uploadFile = async (file,userId) => {
    // Read content from the file
    const fileContent = file;
    const fileName = crypto.randomBytes(16).toString("hex");
    ;

    // Setting up S3 upload parameters
    const params = {
        Bucket: awsConfig.BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    awsConfig.s3.upload(params, function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        saveFile(fileName,userId);
    });
};


module.exports = {
    getAllPdf,
    saveFile,
    getFile,
    uploadFile
}
const aws = require('./aws');
const AWS = require('aws-sdk');
const fs = require('fs');
const crypto = require('crypto');
const {Pool} = require("pg");
const {response} = require("express");
const client = new Pool({
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'docker',
    port: 5432,
});

const ID = 'AKIAUC3AFMY4QSZGJNXL';
const SECRET = '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';

// The name of the bucket that you have created
const BUCKET_NAME = 'quotecreator';

const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET,
    region: 'eu-west-3'
});

const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        LocationConstraint: 'eu-west-3'
    }
};


const uploadFile = (file) => {
    console.log("uploading file");
    // Read content from the file
    const fileContent = file;
    const fileName = crypto.randomBytes(16).toString("hex");;

    // Setting up S3 upload parameters
    const params = {
        Bucket: BUCKET_NAME,
        Key: fileName , // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    s3.upload(params, function(err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log(data)
        saveFileOnDb(fileName);
    });
};
// retrieve file from S3 and return it as pdf
const getFile = (fileName) => {
    const params = {
        Bucket: BUCKET_NAME,
        Key: 'Sat Apr 02 2022'
    };
    s3.getObject(params, function(err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        fs.writeFileSync('aws.pdf', data.Body);
    });
};

const saveFileOnDb = (fileName) => {
    console.log("ici");
    client.query('insert into users_document (user_id, document_id) values (1, $1)',
        [fileName], (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            console.log(res.rows);
        }
    });
}
const getAllPdf = () => {
    client.query('select * from users_document t WHERE t.user_id === $1',[10], (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
           response.status(200).json(res.rows);
        }
    });
}

module.exports = {
uploadFile,
    getFile
}

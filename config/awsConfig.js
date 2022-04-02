const AWS = require("aws-sdk");

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

module.exports = {
    s3,
    params,
    BUCKET_NAME
};
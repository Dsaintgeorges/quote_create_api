const AWS = require("aws-sdk");

const ID = process.env.ID;
const SECRET = process.env.SECRET;

// The name of the bucket that you have created
const BUCKET_NAME = 'quote-pdf';
const BUCKET_TEMPLATE = 'template-quote';

const getBucketName = () => {
    return BUCKET_NAME;
}
const getTemplateBucket = ()=>{
    return BUCKET_TEMPLATE;
}
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
    BUCKET_NAME,
    getBucketName,
    getTemplateBucket
};
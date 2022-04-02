const aws = require("../services/awsService");
const awsConfig = require("../config/awsConfig");
const getAllPdf = async (req, res, next) => {
    try {
        res.json(await aws.getAllPdf(req.query.userId));
    } catch (e) {
        res.sendStatus(500);
    }
}
const getPdf = async (req, res, next) => {

    try {
        const params = {
            Bucket: awsConfig.getBucketName(),
            Key: req.query.filename
        };
    awsConfig.s3.getObject(params, function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        res.send(data.Body);
    });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
const uploadFile = async (req, res, next) => {
    try {
        const response = await aws.uploadFile(req);
        res.json(response);
    } catch (e) {
        res.sendStatus(500);
    }
}
module.exports = {
    getAllPdf,
    getPdf,
    uploadFile
}
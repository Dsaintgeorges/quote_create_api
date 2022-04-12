const aws = require("../services/awsService");
const awsConfig = require("../config/awsConfig");
const multer = require("multer");
const fs = require("fs");
const getAllPdf = async (req, res, next) => {
    try {
        res.json(await aws.getAllPdf(req.query.userId));
    } catch (e) {
        res.sendStatus(500);
    }
}
const getAllTemplates = async (req, res, next) => {
    try {
        res.json(await aws.getAllTemplates(req.query.userId));
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
            }
            res.send(data.Body);
        });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
}
const getTemplate = async (req, res, next) => {
    try {
        const params = {
            Bucket: awsConfig.getTemplateBucket(),
            Key: req.query.filename
        };
        awsConfig.s3.getObject(params, function (err, data) {
            if (err) {
                console.log(err);
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
const uploadTemplate = async (req, res, next) => {
    try {
        const response = await aws.uploadTemplate(req.file, req.body.userId, req.body.name);
        res.json(response);
    } catch (e) {
        console.log(e, "error");
        res.sendStatus(500);
    }
}
const setDefaultTemplate = async (req, res, next) => {
    try {
        const response = await aws.setDefaultTemplate(req.query.templateId, req.query.userId);
        res.json(response);
    } catch (e) {
        console.log(e, "error");
        res.sendStatus(500);
    }
}

const isUserHaveDefaultTemplate = (req, res) => {
    try {
        res.json(aws.isUserHaveDefaultTemplate(req.query.userId));
    } catch (e) {
        res.sendStatus(500);
    }
}
const downloadDefaultTemplate = (req, res) => {
    const data = fs.readFileSync('./temp/doc.docx');
    res.contentType("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.send(data);
}
module.exports = {
    getAllPdf,
    getPdf,
    uploadFile,
    getTemplate,
    getAllTemplates,
    uploadTemplate,
    setDefaultTemplate,
    isUserHaveDefaultTemplate,
    downloadDefaultTemplate
}
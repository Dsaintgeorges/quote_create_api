const aws = require("../services/awsService");
const getAllPdf = async (req, res, next) => {
    try {
        res.json(await aws.getAllPdf(req.query.userId));
    } catch (e) {
        res.sendStatus(500);
    }
}
const getPdf = async (req, res, next) => {
    try {
        const file = await aws.getFile(req.query.filename);
        res.sendFile(file);
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
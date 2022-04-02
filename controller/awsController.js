const aws = require("../services/awsService");
const getAllPdf = async (req,res,next)=>{
    try{
    res.json(await aws.getAllPdf(req.query.userId));
    }catch (e) {
        next(e);
    }
}
const getPdf = async (req,res,next)=>{
    try{
        res.sendFile(await aws.getFile(req.query.filename));
    }catch (e) {
        next(e);
    }
}
const uploadFile = async(req,res,next)=>{
    try{
        res.json(await aws.uploadFile(req));
    }catch (e) {
        next(e);
    }
}
module.exports = {
    getAllPdf,
    getPdf,
    uploadFile
}
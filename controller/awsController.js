const aws = require("../services/awsService");
const getAllPdf = async (req,res,next)=>{
    try{
        console.log(res.json(await aws.getAllPdf(req)),"res")
    res.json(await aws.getAllPdf(req));
    }catch (e) {
        next(e);
    }
}
const getPdf = async (req,res,next)=>{
    try{
        res.sendFile(await aws.getFile(req));
    }catch (e) {
        next(e);
    }
}
const saveFile = async (req,res,next)=>{
    try{
        res.json(await aws.saveFile(req));
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
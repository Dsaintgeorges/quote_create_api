const quoteService = require("../services/quoteRenderService");


const docCreate = async (req,res) => {
    let resultat ;
         await new Promise((resolve,reject)=>{
           quoteService.docCreate(req).then(result => {
                resultat = result;
                resolve(result);
            }).catch(err => {
                reject(err);
            });
        }).then(result => {
             res.status(200).json({
                 status: "success",
                 message: "Quote created successfully",
                 data: result
             });
        }).catch(err => {
            res.status(500).json({
                status: "error",
                message: "Error while creating quote",
                data: err
            });
        });
}
module.exports = {
    docCreate
}
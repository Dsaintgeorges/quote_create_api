const carbone = require("carbone");
const fs = require("fs");
const awsService = require("../services/awsService");
const aws = require("./awsService")
const {login} = require("../queries");

carbone.set({converterFactoryTimeout: 6000})


let option = {
    convertTo: 'pdf'
}

const docCreate = async (req) => {
    return new Promise(async (resolve,reject)=>{
        console.log(req.body,"body de l'upload")
        const fileName = req.body.client.name + req.body.date;
        let templatePath;
         await aws.getDefaultTemplate(req.body.userId).then(
             (data) => {
                 if(data === undefined || data === null){
                     console.log(data,'data')
                     templatePath = "./temp/doc.docx"
                 }
                 else{
                     templatePath = "./temp/template.odt"
                     fs.writeFileSync(templatePath, data);
                 }
                    carbone.render(templatePath, req.body, option,
                        async (err, result) => {
                            if (err) {
                                throw err;
                            }
                            // write the result
                            fs.writeFileSync('./result.pdf', result);
                            await awsService.uploadFile(result, req.body.userId,fileName).then(
                                (data)=>{
                                    console.log("uploaded")
                                    resolve("success")
                                }
                            )
                        })
            }).catch((err) => {
             reject(err);
            })
    })
}

module.exports = {
    docCreate
}
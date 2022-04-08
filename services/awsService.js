const client = require('../config/dbconfig');
const fs = require("fs");
const awsConfig = require('../config/awsConfig');
const crypto = require("crypto");
const path = require("path");

const getAllPdf = async (userId) => {
    console.log(userId)
    const result = await client.query('select * from users_document t WHERE t.user_id = $1', [userId]);
    return result.rows;
}
const getAllTemplates = async (userId) => {
    const result = await client.query('select * from users_templates t WHERE t.user_id = $1', [userId]);
    return result.rows;
}

const saveFile = async (fileName, userId) => {
    console.log(fileName)
    console.log(userId)
    const result = await client.query('INSERT INTO users_document (document_id,user_id) VALUES ($1,$2)', [fileName, userId]);
    return result;
}
const saveTemplate = async (fileName, userId) => {
    console.log(fileName)
    console.log(userId)
    const result = await client.query('INSERT INTO users_templates (name,user_id) VALUES ($1,$2)', [fileName, userId]);
    return result;
}

const getFile = async (fileName) => {
    const params = {
        Bucket: awsConfig.getBucketName(),
        Key: fileName
    };
    awsConfig.s3.getObject(params, function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        return data.Body;
    });
};
const uploadFile = async (file, userId) => {
    console.log(file, "je suis le file")
    // Read content from the file
    const fileContent = file;
    const fileName = crypto.randomBytes(16).toString("hex");

    // Setting up S3 upload parameters
    const params = {
        Bucket: awsConfig.BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: fileContent
    };

    // Uploading files to the bucket
    awsConfig.s3.upload(params, function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        saveFile(fileName, userId);
    });
};

const uploadTemplate = async (file, userId, name) => {
    // Read content from the file
    console.log(name, "name")
    console.log(file, "file")
    const fileContent = file;
    const fileName = name + path.parse(file.originalname).ext;

    // Setting up S3 upload parameters
    const params = {
        Bucket: awsConfig.getTemplateBucket(),
        Key: fileName, // File name you want to save as in S3
        Body: Buffer.from(fileContent.buffer)
    };

    // Uploading files to the bucket
    awsConfig.s3.upload(params, function (err, data) {
        if (err) {
            console.log(err, "errrrrrrrr");
        }
        saveTemplate(fileName, userId);
    });
};
const setDefaultTemplate = async (templateId,userId) => {
    // update users_templates to set is_default = true
    const result1 = new Promise((resolve,reject)=>{
        resolve(client.query('UPDATE users_templates SET is_default = false WHERE is_default = true and user_id = $1', [userId]))
    }).then(
        ()=>{
            const result = client
                .query('UPDATE users_templates SET is_default = true WHERE id = $1 and user_id = $2', [templateId,userId]);
            return result;
        }
    )
}
const getDefaultTemplate = async (userId) => {
    let datas;
    const result = await client.query('select * from users_templates t WHERE t.user_id = $1 AND t.is_default = true', [userId]);
    if (result.rowCount > 0) {
        datas = result.rows[0];
        const params = {
            Bucket: awsConfig.getTemplateBucket(),
            Key: datas.name
        };
        const data = await awsConfig.s3.getObject(params).promise();
        return data.Body;
    }else{
       throw new Error("No default template found");
    }


}
/*const getDefaultTemplate = new Promise((resolve, reject) => {
    const result = client.query('select * from users_templates t WHERE t.user_id = $1 AND t.is_default = true', [userId]);
    const params = {
        Bucket: awsConfig.getTemplateBucket(),
        Key: result.rows[0].name
    };
    awsConfig.s3.getObject(params, function (err, data) {
        if (err) {
            console.log(err);
            throw err;
        }
        resolve(data.Body);
    });
});*/


module.exports = {
    getAllPdf,
    saveFile,
    getFile,
    uploadFile,
    uploadTemplate,
    getAllTemplates,
    setDefaultTemplate,
    getDefaultTemplate
}
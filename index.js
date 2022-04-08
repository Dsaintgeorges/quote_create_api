const express = require('express')
const fs = require('fs');
const carbone = require('carbone');
const app = express();
const queries = require('./queries');
const aws = require('./aws');
const AWS = require('aws-sdk');
const multer = require('multer');
const quoteRenderController = require('./controller/quoteRenderController');

const auth = require('./auth');
const cors = require('cors');
const awsController = require("./controller/awsController");
const awsService = require("./services/awsService");

// Set the Region
AWS.config.update({region: 'eu-west-3'});
app.use(express.json());
app.use(cors());
process.env.SECRET_KEY = 'secret';
app.listen(8080,()=>{
    console.log("Voici l'api")
})
carbone.set({ converterFactoryTimeout: 600000 })






let option={
    convertTo: 'pdf'
}

app.post('/createQuote',quoteRenderController.docCreate);
app.get('/result',(req,res)=>{
    res.sendFile('result.pdf',{root:__dirname})
})
app.post('/createUser',queries.createUser);
app.post('/login',queries.login);
app.get('/get-all-pdf',awsController.getAllPdf);
app.post('/save-file',awsController.uploadFile);
app.get('/get-file',awsController.getPdf);
app.post('/upload-template',multer().single('file'),awsController.uploadTemplate);
app.get('/get-templates',awsController.getAllTemplates);
app.get('/download-template',awsController.getTemplate);
app.post('/set-default-template',awsController.setDefaultTemplate);

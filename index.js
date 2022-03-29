const express = require('express')
const fs = require('fs');
const carbone = require('carbone');
const app = express();
const cors = require('cors');
const {response} = require("express");
const queries = require('./queries');

app.use(express.json());
app.use(cors());
app.listen(8080,()=>{
    console.log("Voici l'api")
})



app.post('/createQuote',(req,res)=>{
    docCreate(req)
    res.status(200).send();
})

app.get('/result',(req,res)=>{
    res.sendFile('result.pdf',{root:__dirname})
})

let option={
    convertTo: 'pdf'
}

const docCreate = (req)=>{
    carbone.render('assets/quote.odt', req.body,option,(err, result)=>{
        if (err) {
            return console.log(err);
        }
        // write the result
        fs.writeFileSync('./result.pdf', result);
        process.exit();
    });
}

app.post('/createUser',queries.createUser);
app.post('/login',queries.login);


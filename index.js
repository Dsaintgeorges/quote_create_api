const express = require('express')
const fs = require('fs');
const carbone = require('carbone');
const app = express();
const cors = require('cors');
const {response} = require("express");

app.use(express.json());
app.use(cors());

const docCreate = (req)=>{
    carbone.render('assets/quote.odt', req.body,(err, result)=>{
        if (err) {
            return console.log(err);
        }
        // write the result
        fs.writeFileSync('result.odt', result);
    });
}

app.post('/createQuote',(req,res)=>{
    docCreate(req)
    res.status(200).send();
})

app.listen(8080,()=>{
    console.log("Voici l'api")
})

const express = require('express')
const fs = require('fs');
const carbone = require('carbone');
const app = express();
const cors = require('cors');
const queries = require('./queries');
const auth = require('./auth');

app.use(express.json());
app.use(cors());
process.env.SECRET_KEY = 'secret';
app.listen(8080,()=>{
    console.log("Voici l'api")
})
carbone.set({ converterFactoryTimeout: 600000 })


app.post('/createQuote',auth,(req,res)=>{
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
    });
}

app.post('/createUser',queries.createUser);
app.post('/login',queries.login);


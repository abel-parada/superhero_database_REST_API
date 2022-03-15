'use strict';

const http = require('http');
const path = require('path');
const cors = require('cors');
const fetch = require('node-fetch');//I use node-fetch@2
const express = require('express');

const app = express();
const {port,host} = require('./configSPA.json');
const server = http.createServer(app);

app.use(express.json());
// console.log(__dirname);
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

//menu.html
app.get('/', (req,res) => res.sendFile(path.join(__dirname,'menu.html')));

//allSuperheros.httml
app.get('/getAll', (req,res) =>{
    fetch('http://localhost:4000/api/superheros',{mode:'cors'})//GET is default method
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(error => res.json(error));
})

//oneSuperhero.html
app.post('/getOne', (req,res) => {
    // console.log('This is the text:', req.body);
    const heroID = req.body.heroID;

    if(heroID && heroID.length>0){
        fetch(`http://localhost:4000/api/superheros/${heroID}`,{mode:'cors'})//GET is default method
            .then(data => data.json())
            .then(result => res.json(result))
            .catch(error => res.json(error))
    }
    else{
        res.json({message:'empty id',type:'error'})
    }
})

//addSuperhero.html
app.post ('/add', (req,res) =>{
    const superhero = req.body;

    const options = {
        method: 'POST',
        mode: 'cors',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(superhero)
    }

    fetch('http://localhost:4000/api/superheros', options)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(error => res.json(error))
})

//removeSuperhero.html
app.post('/remove', (req,res) => {
    const heroID = req.body.heroID;

    if(heroID && heroID.length>0){
        fetch(`http://localhost:4000/api/superheros/${heroID}`,{method:'DELETE',mode:'cors'})//GET is default method
            .then(data => data.json())
            .then(result => res.json(result))
            .catch(error => res.json(error))
    }
    else{
        res.json({message:'empty id',type:'error'})
    }
})
// app.all('*',(req,res) =>res.json('not suported'))

server.listen(port,host,() => console.log(`Server ${host}:${port} listening, up and running`));
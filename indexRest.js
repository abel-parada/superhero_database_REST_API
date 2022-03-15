'use strict';

const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require("express");

const app = express();

const {host, port} = require(path.join(__dirname,'configRest.json'));//ask
const server = http.createServer(app);

const Datastorage = require(path.join(__dirname,'storage','dataStorageLayer.js'));
const storage = new Datastorage();

app.use(cors());
app.use(express.json());

// app.get('/',(req,res) => {
//     storage.getAll()
//     .then(result => res.json(result))
//     .catch(error => res.json(error))
// });

app.get('/api/superheros', (req,res)=>
    storage.getAll()
        .then(result=>res.json(result))
        .catch(error=>res.json(error))
);

app.get('/api/superheros/:heroID', (req,res)=> {
    console.log(req.params);
    storage.get(req.params.heroID)
        .then(result=>res.json(result))
        .catch(error=>res.json(error))
    }   
);

app.delete('/api/superheros/:heroID', (req, res) =>
    storage.remove(req.params.heroID)
        .then(result => res.json(result))
        .catch(error => res.json(error))
);

app.post('/api/superheros', (req,res)=>{
    const superhero=req.body;
    storage.insert(superhero)
        .then(status=>res.json(status))
        .catch(error=>res.json(error));
});

app.put('/api/superheros/:heroID', (req,res)=>{
    const superhero= req.body;
    const heroID = req.params.heroID;
    storage.update(heroID, superhero)
        .then(status=>res.json(status))
        .catch(err=>res.json(err));
});

// app.all('*', (req,res)=>res.json('resource not supported'));


server.listen(port,host,() => console.log(`Server${host}:${port} is listening, up and running`));
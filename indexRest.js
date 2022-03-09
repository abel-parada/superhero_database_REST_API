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

app.get('/',(req,res) => {
    storage.getAll()
    .then(result => res.json(result))
    .catch(error => res.json(error))
});

// app.get('/api/superheros/', (req,res)=>
//     storage.getAll()
//         .then(result=>res.json(result))
//         .catch(err=>res.json(err))
// );

// app.get('/api/superheros/:id', (req,res)=>
//     storage.get(req.params.id)
//         .then(result=>res.json(result))
//         .catch(err=>res.json(err))
// );

// app.delete('/api/superheros/:id', (req, res) =>
//     storage.remove(req.params.id)
//         .then(result => res.json(result))
//         .catch(err => res.json(err))
// );

// app.post('/api/superheros', (req,res)=>{
//     const superhero=req.body;
//     storage.insert(superhero)
//         .then(status=>res.json(status))
//         .catch(err=>res.json(err));
// });

// app.put('/api/superheros/:id', (req,res)=>{
//     const superhero= req.body;
//     const id = req.params.id;
//     storage.update(id, superhero)
//         .then(status=>res.json(status))
//         .catch(err=>res.json(err));
// });

// app.all('*', (req,res)=>res.json('resource not supported'));


server.listen(port,host,() => console.log(`Server${host}:${port} is listening, up and running`));
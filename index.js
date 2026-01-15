const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

app.get('/api/stations', async (req, res)=>{
    let response = {nome: 'Piazza Dante'};
    res.status(201).send(JSON.stringify(response));
});

app.get('/api/stations/:nome', async (req, res)=>{
    
});

app.post('/api/users', async (req,res)=>{

});

app.get('/api/users/:name', async (req,res)=>{

});

app.post('/api/routes', async (req,res)=>{

});

app.get('/api/routes', async (req,res)=>{

});

app.get('/api/routes/:departure', async (req,res)=>{

});

app.listen(port, ()=>{
    console.log(`example app listening on port ${port}`)
});
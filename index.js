import express from "express";
const app = express();
const port = 8080;

import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/makeyourmove");
const Station = mongoose.model("Station", {name: String, address: String, city: String, CAP: Number});

app.use(express.json());

app.get('/api/stations', async (req, res)=>{
    const stations = await Station.find().exec();
    res.status(201).send(stations);
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
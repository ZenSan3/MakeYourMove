import express from 'express';
import Station from './models/station.js'
var router = express.Router();

router.get('', async (req, res)=>{
    const stations = await Station.find().exec();
    res.status(200).send(stations);
});

router.get('/:nome', async (req, res)=>{
    const station = await Station.find({name: req.params.nome}).exec();
    res.status(200).send(station);
});

router.post('', async (req, res)=>{
    console.log(req.body)
    res.status(201).send("saved");
})

export default router;
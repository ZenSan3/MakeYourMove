import express from 'express';
import Station from './models/station.js'
const router = express.Router();

router.get('', async (req, res)=>{
    const stations = await Station.find().exec();
    res.status(201).send(stations);
});

router.get('/:nome', async (req, res)=>{
    const station = await Station.find({name: req.params.nome}).exec();
    res.status(201).send(station);
});


export default router;
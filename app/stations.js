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
    console.log(req.body);
    const nstation = await Station.create({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        CAP: req.body.CAP
    });

    nstation.save().then(()=>console.log('saved'));

    res.status(201).send("saved");
})

router.delete('/:nome', async (req, res) =>{
    console.log(req.params);
    await Station.deleteOne({name: req.params.nome})
    res.status(202).send('Deleted');
});

export default router;
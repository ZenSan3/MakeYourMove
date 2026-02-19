import express from 'express';
import Station from './models/station.js'
var router = express.Router();

/**
 * Return all the stations that there is in the database
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 */
router.get('', async (req, res)=>{
    const stations = await Station.find().exec();
    res.status(200).send(stations);
});

/**
 * Return a station with the same name of the request
 
 * @param {*} req 
 * @param {*} res 
 * @param {String} nome
 * 
 */
router.get('/:name', async (req, res)=>{
    const station = await Station.findOne({name: req.params.name}).exec();
    if(!station){
        res.status(404).json({success: false, message: "Station not Found"})
    }else{
        res.status(200).send(station);
    }
});

/**
 * Add a new station to the database
 * 
 * @param {*} req
 * @param {*} res
 * 
 * The Body of the request MUST HAVE these information in JSON format: name, address, city,CAP
 */
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

/**
 * Delete a station in the database with the name given in the request
 * 
 * @param {*} req
 * @param {*} res
 * @param {String} nome
 * 
 */
router.delete('/:nome', async (req, res) =>{
    console.log(req.params);
    const station = Station.findOne({name: req.params.nome}).exec();

    if(!station){
        res.status(404).json({success: false, message:"Station not Found"});
    }else{
        await Station.deleteOne({name: req.params.nome})
        res.status(202).send('Deleted');
    }
});

export default router;
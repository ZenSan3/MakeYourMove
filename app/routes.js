import express from 'express';
import Route from './models/route.js';
import User from './models/user.js';
import Station from './models/station.js';
const router = express.Router();
router.use(express.json());

/**
 * return all the routes that are currently in the database
 * 
 * @param {*} req 
 * @param {*} res 
 */
router.get('', async (req, res)=>{
    const routes = await Route.find().exec();
    res.status(200).send(routes);
});

/**
 * Return the routes that depart in a specific date
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {Date} date
 */
router.get('/all/:date', async (req, res)=>{
    const routes = await Route.find().where("dateOfDeparture").gt(req.params.date);
    res.status(200).send(routes);
});

/**
 * Get all the routes created by a specific user
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {String} user
 */
router.get('/:user', async (req, res)=>{
    const user = await User.findOne({username: req.params.user}).exec();
    if(!user){
        res.status(400).json({success: false, message: "Requested User not found"});
    }else{
        const routes = await Route.find({user: req.params.user}).exec();
        if(!routes) {res.status(401).json({success: false, message:'no routes created by user'})}
        res.status(200).send(routes);
    }
});

/**
 * Add a new station to the database
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * the body of the request MUST HAVE: User, StationA, StationB and dateOfDeparture in JSON Format
 */
router.post('', async (req, res) =>{
    console.log(req.body);

    const user = await User.findOne({username: req.body.user}).exec();
    const sA = await Station.findOne({name: req.body.stationA}).exec();
    const sB = await Station.findOne({name: req.body.stationB}).exec();
    const data = new Date(req.body.dateOfDeparture)

    if(!user){
        res.status(400).json({success: "false", message: "Requested user do not exist"});
    }else if(!sA || !sB){
        res.status(400).json({success: "false", message: "Requested station do not exist"});
    }else if(data.getTime() <= Date.now()){
        res.status(406).send('Date not valid');
    }else{
        const nroot = await Route.create({
            user: req.body.user,
            stationA: req.body.stationA,
            stationB: req.body.stationB,
            dateOfDeparture: req.body.dateOfDeparture,
        });
        nroot.save().then(() => console.log('saved'));
        res.status(201).send('saved');
    }
});

/**
 * Delete a specific route using the id, because is the only univocal field
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {String} id
 */
router.delete('/', async (req, res) =>{
    console.log(req.body);

    const route = await Route.findOne({
            user: req.body.user,
            stationA: req.body.stationA,
            stationB: req.body.stationB,
            dateOfDeparture: req.body.dateOfDeparture,
        }).exec();
    if(!route){
        res.status(404).json({success: false, message: "Route with requested id do not exist"});
    }else{
        await Route.deleteOne({
            user: req.body.user,
            stationA: req.body.stationA,
            stationB: req.body.stationB,
            dateOfDeparture: req.body.dateOfDeparture,
        })
        res.status(202).send('Deleted');
    }
});

export default router;
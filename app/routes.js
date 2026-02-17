import express from 'express';
import Route from './models/route.js'
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
    const routes = await Route.find({user: req.params.user}).exec();
    if(!routes) {res.status(401).json({success: false, message:'no routes created by user'})}
    res.status(200).send(routes);
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
    if(req.body.dateOfDeparture <= Date.now){
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
router.delete('/:id', async (req, res) =>{
    console.log(req.params);
    await Route.deleteOne({_id: req.params.id})
    res.status(202).send('Deleted');
});

export default router;
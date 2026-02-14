import express from 'express';
import Route from './models/route.js'
const router = express.Router();
router.use(express.json());

router.get('', async (req, res)=>{
    const routes = await Route.find().exec();
    res.status(200).send(routes);
});

router.get('/all/:date', async (req, res)=>{
    const routes = await Route.find().where("dateOfDeparture").gt(req.params.date);
    res.status(200).send(routes);
});

router.get('/:user', async (req, res)=>{
    const routes = await Route.find({user: req.params.user}).exec();
    if(!routes) {res.status(401).json({success: false, message:'no routes created by user'})}
    res.status(200).send(routes);
});

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

router.delete('/:id', async (req, res) =>{
    console.log(req.params);
    await Route.deleteOne({_id: req.params.id})
    res.status(202).send('Deleted');
});

export default router;
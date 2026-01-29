import express from 'express';
import Route from './models/route.js'
const router = express.Router();

router.get('', async (req, res)=>{
    const routes = await Route.find().exec();
    res.status(201).send(routes);
});

router.get('/:date', async (req, res)=>{
    const routes = await Route.find().where("dateOfDeparture").gt(req.params.date);
    res.status(201).send(routes);
});

export default router;
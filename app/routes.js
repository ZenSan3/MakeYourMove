import express from 'express';
import Route from './models/route.js'
const router = express.Router();

router.get('', async (req, res)=>{
    const routes = await Route.find().exec();
    res.status(201).send(routes);
});


export default router;
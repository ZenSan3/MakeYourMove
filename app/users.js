import express from 'express';
import User from './models/user.js'
const router = express.Router();

router.get('', async (req, res)=>{
    const users = await User.find().exec();
    res.status(201).send(users);
});

export default router;
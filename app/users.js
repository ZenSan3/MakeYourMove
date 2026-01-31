import express from 'express';
import User from './models/user.js'
const router = express.Router();

router.get('', async (req, res)=>{
    const users = await User.find().exec();
    res.status(200).send(users);
});

router.get('/:username', async (req, res)=>{
    const user = await User.findOne({username: req.params.username}).exec();
    res.status(200).send(user);
});

export default router;
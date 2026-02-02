import express from 'express';
import User from './models/user.js'
const router = express.Router();
router.use(express.json());

router.get('', async (req, res)=>{
    const users = await User.find().exec();
    res.status(200).send(users);
});

router.get('/:username', async (req, res)=>{
    const user = await User.findOne({username: req.params.username}).exec();
    res.status(200).send(user);
});

router.post('', async (req, res)=>{
    console.log(req.body);
    const Nuser = await User.create({
        username: req.body.username,
        email: req.body.email,
        pwd: req.body.pwd,
        role: req.body.role,
        disability: req.body.disability
    });

    Nuser.save().then(()=>console.log('saved'));

    res.status(201).send("Saved");
});

router.delete('/:email', async (req, res)=>{
    console.log(req.params);
    await User.deleteOne({email: req.params.email})
    res.status(202).send('Deleted');
});

export default router;
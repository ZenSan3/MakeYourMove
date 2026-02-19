import express from 'express';
import User from './models/user.js'
const router = express.Router();
router.use(express.json());

/**
 * Return all the users present in the database
 * 
 * @param {*} req 
 * @param {*} res
 */
router.get('', async (req, res)=>{
    const users = await User.find().exec();
    res.status(200).send(users);
});

/**
 * Return the specific user with the username requested
 * 
 * @param {*} req 
 * @param {*} res
 * @param {String} username
 */
router.get('/:username', async (req, res)=>{
    const user = await User.findOne({username: req.params.username}).exec();
    res.status(200).send(user);
});

/**
 * Add a new user to the database
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * The Body of the request MUST contain: username, email and pwd in JSON form
 */
router.post('', async (req, res)=>{
    console.log(req.body);
    const pUser = await User.findOne({username:req.body.username, email:req.body.email});
    if(pUser){
        res.status(403).json({success:false, message:"User already exists"});
    }else{
        const Nuser = await User.create({
            username: req.body.username,
            email: req.body.email,
            pwd: req.body.pwd,
            role: req.body.role,
            disability: req.body.disability
        });

        Nuser.save().then(()=>console.log('saved'));
    }
    res.status(201).send("Saved");
});

/**
 * Change the password of an account
 * 
 * @param {*} req 
 * @param {*} res
 * @param {String} email
 * 
 * The body have to contain the new password in JSON form
 */
router.post('/:email/changePassword', async (req, res)=>{
    console.log(req.body);
    const user = await User.findOne(req.params.email).exec();
    if(!user){
        res.status(404).json({success: false, message: "User not Found"});
    }else{
        await User.findOneAndUpdate(req.params.email, {pwd: req.body.pwd});
        res.status(202).send('Updated');
    }
})

/**
 * Delete a user with the given Email
 * 
 * @param {*} req 
 * @param {*} res
 * @param {String} email
 */
router.delete('/:email', async (req, res)=>{
    console.log(req.params);
    await User.deleteOne({email: req.params.email})
    res.status(202).send('Deleted');
});

export default router;
import express, { Router } from 'express';
import User from './models/user.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
const router = express.Router();
router.use(express.json());

router.post('', async function(req, res){
    let user = await User.findOne({email: req.body.email}).exec();

    if(!user){res.json({success:false, message: 'User not found'});}
    if(user.password!=req.body.password){res.json({success: false, message:'Wrong password'});}

    var payload = {email:user.email, id:user._id};
    var options = {expiresIn: 86400}
    var token = jwt.sign(payload, process.env.SECRET, options);

    res.json({success: true, message: 'Token sended', token: token, email: user.email, id: user._id, self: "api/" + user._id});
});

export default router;
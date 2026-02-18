import express, { Router } from 'express';
import User from './models/user.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'; 
const router = express.Router();
router.use(express.json());

/**
 * Authentication for the users to access protected routes
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * Return the token to put in the header if the user exist and the password is the same
 */
router.post('', async function(req, res){
    let user = await User.findOne({email: req.body.email}).exec();

    if(!user){res.json({success:false, message: 'User not found'});}
    if(user.pwd!=req.body.pwd){res.json({success: false, message:'Wrong password'});}

    var payload = {email:user.email, id:user._id};
    var options = {expiresIn: 86400} //24h
    var token = jwt.sign(payload, process.env.SECRET, options);

    res.json({success: true, message: 'Token sended', token: token, email: user.email, id: user._id, self: "api/" + user._id});
});

export default router;
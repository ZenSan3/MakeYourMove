import jwt from 'jsonwebtoken';

/**
 * Check if the Token required for accessing protected routes in the API is present and valid
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * 
 * After having checked the token the function call next() to do the task protected
 */
const tokenChecker = function (req, res, next){
    var token = req.headers['x-access-token'];
    if(!token){res.status(401).json({success: false, message:'no token provided'})}

    jwt.verify(token, process.env.SECRET, function(err, decoded){
        if(err) {res.status(403).json({success: false, message: 'Token not valid'})}
        else{
            req.loggedUser = decoded;
            next();
        }
    });
};

export default tokenChecker;
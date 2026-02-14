import jwt from 'jsonwebtoken';


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
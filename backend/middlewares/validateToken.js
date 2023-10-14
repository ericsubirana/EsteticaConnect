const jwt = require("jsonwebtoken");
const {TOKEN_SECRET} = require("../config");

const authRequired = (req, res, next) => { //next es necesari ja que es un middleware
    const {token} = req.cookies;
    if(!token){
        res.status(401).json({message: "No token provided"});
    }else{
        console.log(token, TOKEN_SECRET)
        jwt.verify(token, TOKEN_SECRET, (err, decodedToken) => {
            if(err){
                res.status(401).json({message: "Invalid token"});
            }
            req.user = decodedToken;
            next();
        });
    }
};

module.exports = {authRequired};
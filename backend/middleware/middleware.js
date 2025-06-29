const jwt = require("jsonwebtoken");
require("dotenv").config();

const middleware = {
    verifyToken: async(req,res, next) => {
        const token = req.headers.token;
        if(token){
            const accessToken = token.split(" ")[1];
            jwt.verify(accessToken, process.env.ACCESS_TOKEN, (err, user)=>{
                if(err){
                    return res.status(401).json("Token khong hop le");
                }
                req.user = user;
                next();
            })
        }else{
            return res.status(403).json("Token khong ton tai");
        }
    }
}

module.exports = middleware;
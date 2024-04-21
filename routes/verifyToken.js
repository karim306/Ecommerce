const jwt = require("jsonwebtoken")

const  verifyToken = (req,res,next)=>{
    const authHeader = req.headers.verifyToken
    if(authHeader){
        //using bearer
        const token = authHeader.split(" ")[1];
        jwt.verify(token , process.env.JWT_SEC , (ERR , USER)=> {
            if(err) res.status(403).json("Token is not Valid ");
            req.user = user;
            next();
        })
    }else{
        return res.status(401).json("Ypu are not authenticated ")
    }


}


const verifyTokenAndAuthorization = (teq , res, next )=>{
    verifyToken(req , res,()=>{
        if(req.user.id === req.params.id  || req.user.isAdmin){
            next()
        }else{
            res.status(403).json("You are not allowed!!!!")
        }
    });
}
module.exports  = {verifyToken}
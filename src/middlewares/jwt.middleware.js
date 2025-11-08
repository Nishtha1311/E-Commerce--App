import jwt from "jsonwebtoken";

const jwtAuth=(req,res,next)=>{
    const token=req.headers["authorization"];

    if(!token){
        return res.status(401).json({error:"Unauthorized"});
    }
    try{

    const payLoad=jwt.verify(token,"5pz06LmsnL");
    console.log(payLoad);
    req.userID=payLoad.userID;
    }
    catch(err){
        return res.status(401).json({error:"Unauthorized"});
    }
    next();
    
}
export default jwtAuth;
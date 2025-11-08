import { UserModel } from "../features/Users/users.model.js";

const basicAuthorizer=(req,res,next)=>{
    const authHeaders=req.headers["authorization"];

    if(!authHeaders){
        return res.status(401).send("No authorization Details found");

    }
    console.log(authHeaders);

    const base64credentials=authHeaders.replace('Basic','');
    console.log(base64credentials);

    const decodedCreds=Buffer.from(base64credentials,'base64').toString('utf-8');
    console.log(decodedCreds);

    const creds=decodedCreds.split(':');

    const user=UserModel.getAll().find((u)=> u.email==creds[0] && u.password==creds[1]);
       
   
    if(user){
        next();
    }else{
        return res.status(401).send("Incorrect Credentials");
    }
}

export default basicAuthorizer;
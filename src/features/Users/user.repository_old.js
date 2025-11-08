import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class UserRepository{

    async SignUp(newUser){
        try{
        const db=getDB();

        const collection=db.collection("users");
        
       
        const result=await collection.insertOne(newUser);
        newUser._id=result.insertedId;
        return newUser;
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went Wrong.Please try again later");
    }
}

async findByEmail(email){
    try{
        const db=getDB();

        const collection=db.collection("users");

       return await collection.findOne({email});
        
    }catch(err){
        console.log(err);
        throw new ApplicationError("Something went wrong.Please try again later");
    }
}
}

export default UserRepository;
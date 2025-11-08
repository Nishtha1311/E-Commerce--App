import mongoose from "mongoose";

import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

const UserModel=mongoose.model('User',userSchema);

export default class UserRepository{


    async SignUp(user){
        try{
            const newUser=new UserModel(user);
            await newUser.save();
            return newUser;
            


        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database");
        }



    }

    async SignIn(email,password){
        try{

            return await UserModel.findOne({email,password});

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database");
        }

    }

    async findByEmail(email){
        try{

            return await UserModel.findOne({email});


        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database");
        }
    }

    async resetPassword(userID,newPassword){
        try{
            let user=await UserModel.findById(userID);
            if(user){
                user.password=newPassword;
                user.save();
            }else{
                throw new Error("User not found");
            }



        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong");
        }
    }
}
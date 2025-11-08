import UserRepository from "./user.repository.js";
import { UserModel } from "./users.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error-handler/applicationError.js";

export class UserController{

    constructor(){
        this.userRepository=new UserRepository();
    }

   async SignUp(req,res){
        const {name,email,password,type}=req.body;
        const hashedPassword=await bcrypt.hash(password,12);
        
       const user=new  UserModel(
        name,
        email,
        hashedPassword,
        type);
       const savedUser=await this.userRepository.SignUp(user);
       res.status(201).send(savedUser);
    }

    async SignIn(req,res){
        try{

            const user=await this.userRepository.findByEmail(req.body.email);
            if(!user){
                return res.status(400).send("Incorrect Credentials");
            }else{

                //Compare password with hashed password
                const result=await bcrypt.compare(req.body.password,user.password);
                if(result){
                     const token=jwt.sign({userID:user._id,email:user.email},
            process.env.JWT_SECRET,
            {expiresIn:'1h'}
        );
        return res.status(200).send(token);

                }else{
                  
                    return res.status(404).send("Incorrect Credentials");
                }
            }
        
        
    }
    catch(err){
        console.log(err);
        return res.status(404).send("Something went wrong.Please try again later");
    }
    }

    async resetPassword(req,res,next){
        const{newPassword}=req.body;
        const userID=req.userID;
        const hashedPassword=await bcrypt.hash(newPassword,12);
        try{
            await this.userRepository.resetPassword(userID,hashedPassword);
            res.status(200).send("Password is updated Successfully");
        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong");
        }
    }
}
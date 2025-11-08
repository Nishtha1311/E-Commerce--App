import express from "express";
import { UserController } from "./users.controller.js";
import jwtAuth from "../../middlewares/jwt.middleware.js";

const userRouter=express.Router();

const userController=new UserController();

userRouter.post("/signup",(req,res)=>{
    userController.SignUp(req,res)
});
userRouter.post("/signin",(req,res)=>{
    userController.SignIn(req,res)
});

userRouter.put("/",jwtAuth,(req,res,next)=>{
    userController.resetPassword(req,res,next)
});

export default userRouter;
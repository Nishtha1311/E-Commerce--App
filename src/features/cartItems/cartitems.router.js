import express from "express";
import CartItemController from "./cartitems.controller.js";

const cartItemController=new CartItemController();

const cartRouter=express.Router();

cartRouter.delete("/:id",(req,res)=>{
    cartItemController.delete(req,res)
});

cartRouter.post("/",(req,res)=>{
    cartItemController.add(req,res)
});
cartRouter.get("/",(req,res)=>{
    cartItemController.get(req,res)
});

export default cartRouter;
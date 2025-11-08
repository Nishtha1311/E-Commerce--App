import CartItemsModel from "./cartitems.model.js";
import CartItemsRepository from "./cartitems.repository.js";
export default class CartItemController{

    constructor(){
        this.cartItemsRepository=new CartItemsRepository();
    }
    add(req,res){
        const{productID,quantity}=req.body;
        const userID=req.userID;

        this.cartItemsRepository.add(productID,userID,quantity);
        res.status(201).send("Cart has been updated successfully!");
    }

    async get(req,res){
        try{
        const userID=req.userID;
        console.log(req.userID);
        const items=await this.cartItemsRepository.get(userID);
        return res.status(200).send(items);
        }catch(err){
            console.log(err);
            return res.status(404).send("Something went wrong");
        }
    }

    async delete(req,res){
        const userID=req.userID;
        const cartItemID=req.params.id;
        const error=await this.cartItemsRepository.delete (cartItemID,userID);
        if(error){
            return res.status(404).send("Item not found");
        }else{
            return res.status(200).send("Cart item is removed");
        }
    }
}
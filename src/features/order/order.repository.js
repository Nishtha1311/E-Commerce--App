import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

export default class OrderRepository{
    constructor(){

    
    this.collection="orders";
    }

    async placeOrder(userID){
        const client=getClient();
        const session=client.startSession();
        try{
        const db=getDB();
        session.startTransaction();
        
        const items= await this.getTotalAmount(userID);
        const finalTotalAmount=items.reduce((acc,item)=>item.totalAmount+acc,0);
        console.log(finalTotalAmount);

        //Create an order record

        const newOrder=new OrderModel(new ObjectId(userID),finalTotalAmount,new Date());
        await db.collection(this.collection).insertOne(newOrder,{session});

        //Reduce the Stock

        for(let item of items){
            await db.collection("products").updateOne(
                {_id:item.productID},
                {$inc:{stock:-item.quantity}},{session}
            )

           
        }

        //throw new Error("Something is wrong in placeOrder ");

        //Clear the Cart

        await db.collection("cartItems").deleteMany({
            userID:new ObjectId(userID)
        },{session});
        session.commitTransaction();
        session.endSession();
        return;
    }catch(err){
        await session.abortTransaction();
        session.endSession();

        console.log(err);
        throw new ApplicationError("Something went wrong with the database");
    }

       

    }

    async getTotalAmount(userID,session){

        const db=getDB();
        const items=await db.collection("cartItems").aggregate([
            {
                $match:{userID:new ObjectId(userID)}
            },
            {
                $lookup:{
                    from:"products",
                    localField:"productID",
                    foreignField:"_id",
                    as:"productInfo"
                }
            },
            {
                $unwind:"$productInfo"
            },
            {
                $addFields:{
                    "totalAmount":{
                        $multiply:["$productInfo.price","$quantity"]
                    }
                }
            }
        ],{session}).toArray();
        return items;

    }
}


import mongoose from "mongoose";

export const likeSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User'
    },

    likeable:{
        type:mongoose.Schema.ObjectId,
        refPath:'types'
    },
    types:{
        type:String,
        enum:['Product','Category']
    }

}).pre('save',(next)=>{
    console.log("New Like coming");
}).post('save',(doc)=>{
    console.log("Like is saved");
    console.log(doc);
})
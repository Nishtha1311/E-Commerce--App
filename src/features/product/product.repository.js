import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { ProductSchema } from "./product.schema.js";
import { reviewSchema } from "./product.review.schema.js";
import mongoose from "mongoose";
import { categorySchema } from "./category.schema.js";

const ProductModel=mongoose.model('Product',ProductSchema);
const ReviewModel=mongoose.model('Review',reviewSchema);
const CategoryModel=mongoose.model('Category',categorySchema);

class ProductRepository{
    constructor(){
        this.collection="products";
    }

    async add(productData){
        try{

            //1.Add the Product
            productData.categories=productData.category.split(',').map((e)=>e.trim());
            console.log(productData);
            const newProduct=new ProductModel(productData);
            const savedProduct=await newProduct.save();


            //2.Update Categories
            await CategoryModel.updateMany(
                {_id:{$in: productData.categories}},
                {
                    $push:{
                        products:new ObjectId(savedProduct._id)
                    }
                }
            )

       

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database");
        }
    }

    async getAll(){
        try{
            const db=getDB();
            const collection=db.collection(this.collection);
          const product=await   collection.find().toArray();
          console.log(product);
          return product;

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database");
        }
    }

    async get(id){
        try{

            const db=getDB();
            const collection=db.collection(this.collection);
            return collection.findOne({_id:new ObjectId(id)});

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database");
        }
    }

    async filter(minPrice,categories){
        try{

           const db=getDB();
           const collection=db.collection(this.collection);
           let filterExpresssions={};

           if(minPrice){
            filterExpresssions.price={$gte:parseFloat(minPrice)};
           }

          

           if(categories){
          
            //filterExpresssions.category=category
            categories=JSON.parse(categories.replace(/'/g,'"'));

            filterExpresssions={$or:[{categories:{$in:categories}},  filterExpresssions]};
           }


           


           console.log("Filter being applied:",filterExpresssions);

           return  collection.find(filterExpresssions).project({name:1,price:1,_id:0,ratings:{$slice:1}}).toArray();

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database");
        }
    }


    async rate(userID,productID,rating){

        try{

            //1.check if product exists

            const productToUpdate=await ProductModel.findById(productID);
            if(!productToUpdate){
                throw new Error("Product not found");
            }

            //2.Get the existing Review

            const userReview=await ReviewModel.findOne({
                product:new ObjectId(productID),
                user:new ObjectId(userID)
            });

            if(userReview){
                userReview.rating=rating;
                await userReview.save();
            }
            else{
                const newReview=await new ReviewModel({
                    product:new ObjectId(productID),
                    user:new ObjectId(userID),
                    rating:rating

                });
                await newReview.save();
            }

    

    

        }catch(err){
            console.log(err);
            throw new ApplicationError("Something went wrong with the database",500);
        }
    }
    
        

//             const db=getDB();
//             const collection=db.collection(this.collection);

//             const product=await collection.findOne({_id:new ObjectId(productID)});

//             const userRating=product?.ratings?.find(r=>r.userID==userID);


//             //1.removing the existing entry
//             await collection.updateOne(
//                 {_id:new ObjectId(productID)},
//                 {
//                     $pull:{ratings:{userID:new ObjectId(userID)}}
                
                
//          } );
// //2. adding a new entry
//             await collection.updateOne({
//                 _id:new ObjectId(productID),
//             },
//         {
//             $push:{ratings:{userID:new ObjectId(userID),rating}}
//         });



    async averagePricePerCategory(){
        const db=getDB();

        return await db.collection(this.collection)
        .aggregate([
            {
            $group:{
                _id:"$category",
                averagePrice:{$avg:"$price"}
            }
        }
        ]).toArray();
    }
}

export default ProductRepository;
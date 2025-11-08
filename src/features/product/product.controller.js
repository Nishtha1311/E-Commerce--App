

import ProductModel from "./products.model.js";
import ProductRepository from "./product.repository.js"


export default class ProductController{
    constructor(){
        this.productRepository=new ProductRepository();
    }
    
    async getAllProducts(req,res){
        try{
             const product=await this.productRepository.getAll();
        res.status(200).send(product);

        }catch(err){
            console.log(err);
            return res.status(404).send("Something went wrong");
        }

       
    }

   async addProduct(req,res){
    try{
        const{name,price,size,categories,description}=req.body;
        const sizesArray = size && typeof size === "string" ? size.split(",") : [];
        
        const imageFile = req.file ? req.file.filename : null;
        const newProduct = new ProductModel(
    name,
    description, // goes into desc
    imageFile,
    categories,  // goes into category
    parseFloat(price),
    sizesArray
);
      
           
           
        const createdRecord=await this.productRepository.add(newProduct);
        res.status(201).send(createdRecord);
    }catch(err){
        console.log(err);
        return res.status(500).send("Something went wrong");

    }
    }

    async rateProduct(req,res,next){
        try{
        const userID=req.userID;
       const productID=req.body.productID;
       const rating=req.body.rating;

       const numericRating=parseFloat(rating);

      const result= await this.productRepository.rate(
        userID,
        productID,
        numericRating);

       
        return res.status(200).send("Rating has been added");
       
        
    }catch(err){
        console.log("Parsing error into next middleware",err);
        next(err);
    }
}


    async getOneProduct(req,res){
        try{

        
        const id=req.params.id;
        const product=await this.productRepository.get(id);
        if(!product){
            res.status(404).send("Product not Found");
        }else{
            return res.status(200).send(product);
            
        }
    }catch(err){
        console.log(err);
        return res.status(404).send("Something went wrong");
    }
    }

    async filterProducts(req,res){
        try{
        const minPrice=req.query.minPrice;
        console.log(minPrice);
        const maxPrice=req.query.maxPrice;
        const categories=req.query.categories ;
        console.log(categories);
        const result=await this.productRepository.filter(
            minPrice,
            categories
           
        );
        console.log(minPrice);
        console.log(maxPrice);
        
        res.status(200).send(result);
    }
    catch(err){
        console.log(err);
        return res.status(404).send("Something went wrong");

    }

    

}

async filterPrice(req,res,next){
    try{

        const result=await this.productRepository.averagePricePerCategory();
        res.status(200).send(result);

    }catch(err){
        console.log(err);
        return res.status(404).send("Something went wrong with the database",500);
    }
}
}
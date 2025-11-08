import express from "express";
import ProductController from "./product.controller.js";
import { upload } from "../../middlewares/fileupload.middleware.js";

const productRouter=express.Router();

const productController=new ProductController();

productRouter.get("/",(req,res)=>{
    productController.getAllProducts(req,res)
});
productRouter.post("/rate",(req,res,next)=>{
    productController.rateProduct(req,res,next)
});

productRouter.post("/",upload.single('imageUrl'),(req,res)=>{
    productController.addProduct(req,res)
});
productRouter.get("/filter",(req,res)=>{
    productController.filterProducts(req,res)
});

productRouter.get("/averagePrice",(req,res,next)=>{
    productController.filterPrice(req,res,next)
});

productRouter.get("/:id",(req,res)=>{
    productController.getOneProduct(req,res)
});



export default productRouter;
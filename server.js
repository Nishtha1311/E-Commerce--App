import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";
import cors from "cors";
import  productRouter from "./src/features/product/product.routes.js";
import bodyParser from "body-parser";
import userRouter from "./src/features/Users/users.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cartItems/cartitems.router.js";
import apiDocs from "./swagger.json" assert{type:'json'};
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/error-handler/applicationError.js";
import connectToMongoDB from "./src/config/mongodb.js";
import orderRouter from "./src/features/order/order.router.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";
import likeRouter from "./src/features/Like/like.routes.js";

const server=express();
server.use(cors());


var corsOptions={
    origin:'http://localhost:5500'
}
//CORS policy configuration

// server.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin','http://localhost:3200');
//     res.header('Access-Control-Allow-Origin','*');
//     res.header('Access-Control-Allow-Methods','*');

//     if(req.method=="OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })
server.use(bodyParser.json());

server.use(
    '/api-docs',
    swagger.serve,
    swagger.setup(apiDocs)
);
server.use(loggerMiddleware);
server.use("/api/orders",jwtAuth,orderRouter);
server.get("/",(req,res)=>{
    res.send("Welcome to E-Commerce APIs");
});



server.use("/api/products",jwtAuth,productRouter);
server.use("/api/cartItems",loggerMiddleware,jwtAuth,cartRouter);
server.use("/api/users",userRouter);
server.use("/api/likes",jwtAuth,likeRouter);

//Error handler Middleware

server.use((err,req,res,next)=>{
    console.log(err);

    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(503).send("Something went wrong.Please try again later");
});


//Middleware to handle 404 requests
server.use((req,res)=>{
    res.status(404).send("API not found. Please check our documentation for more information at localhost:3200/api-docs");
})

server.listen(3200,()=>{
    console.log("Server is listening on 3200");
    connectUsingMongoose();
    
});
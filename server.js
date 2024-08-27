import './env.js';

import express from "express";
import swagger from 'swagger-ui-express';
import cors from 'cors';

import userRouter from './src/features/user/user.routes.js';
import postsRouter from './src/features/posts/posts.routes.js';
import likeRouter from './src/features/like/like.routes.js';
import commentRouter from './src/features/comment/comment.routes.js';
import friendRouter from './src/features/friend/friend.routes.js';
import otpRouter from './src/features/otp/otp.routes.js';
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import apiDocs from './swagger.json' assert {type : 'json'};
import {loggerMiddleware} from './src/middlewares/logger.middleware.js';
import { ApplicationError } from "./src/error-handler/applicationError.js";
import mongoose from 'mongoose';
import { connectUsingMongoose } from './src/config/mongooseConfig.js';

const server = express();

// CORS Policy Cofiguration
server.use(cors());

server.use(express.json());
server.use("/api-docs", swagger.serve , swagger.setup(apiDocs));
server.use(loggerMiddleware);

// localhost:3000/api/users
server.use("/api/users", userRouter);

// localhost:3000/api/posts
server.use("/api/posts",jwtAuth ,postsRouter);

// localhost:3000/api/likes
server.use("/api/likes",jwtAuth ,likeRouter);

// localhost:3000/api/comments
server.use("/api/comments",jwtAuth ,commentRouter);

// localhost:3000/api/friends
server.use("/api/friends",jwtAuth ,friendRouter);

// localhost:3000/api/otp
server.use("/api/otp", otpRouter);

// localhost:3000
server.use('/',(req,res)=>{
   return res.send('Welcome to the POSTWAY !');
})

// Error Handler Middleware -->>  Placed at the end of other Middlewares -->>
server.use((err,req,res,next)=>{
    console.log(err);
    if(err instanceof mongoose.Error.ValidationError){
        return res.status(400).send(err.message);
    }

    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    // Server Errors -->>
    res.status(500).send('Something went wrong. Please try later.');

})

// Middleware to handle 404 requests (Resource not Found)
server.use((req,res)=>{
    res.status(404).send("API not Found. Please check our documentation for more information at localhost:3000/api-docs");
})


server.listen(8000,()=>{
    console.log("Server is running at 8000");
    connectUsingMongoose();
});
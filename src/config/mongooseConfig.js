import mongoose from "mongoose";
import { errorHandlerMiddleware } from "../error-handler/errorHandler.js";
const url = "mongodb://localhost:27017";
export const connectUsingMongoose = async ()=>{
    try{
        await mongoose.connect(url);
        console.log('Connected to MongoDB using Mongoose')
    }catch(err){
        console.log("Error while connected to db");
        errorHandlerMiddleware(err);
    }
}
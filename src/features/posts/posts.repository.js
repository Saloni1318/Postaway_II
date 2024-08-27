import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import mongoose from "mongoose";
import { postSchema } from "./posts.schema.js";

const PostsModel = new mongoose.model('Posts' , postSchema);

export default class PostsRepository{
    constructor(){
        this.collection = "posts";
    }

     // Create Post
     async add(postData){
        try{
            // Adding Post-->>
            const newPost = new PostsModel(postData);
            const savedProduct = await newPost.save(); 
            return savedProduct;
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
      }
  
      // Get Post by ID
      async get(postID){
        try{
            return await PostsModel.findById({_id: new ObjectId(postID)});
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
      }
       
      // Get All Posts
      async getAll(){
        try{
            const posts = await PostsModel.find();
            console.log(posts);
            return posts;
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
      }
  
      // Get Specific User Posts
      async getUserPosts(userID){
        try{
            const posts = await PostsModel.find({userId : userID});
            return posts;
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
      }
  
      // Delete a Post
      async delete(postID,userID){
        try{
            const postToDelete = await PostsModel.findById(postID);
            if(!postToDelete) return 0; // No post found
            if(postToDelete.userId==userID){
                 await PostsModel.findByIdAndDelete(postID);
                 return 1; // Post deleted
            }else{
                return -1;   // User not allowed
            }
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
      }
  
      // Update a post
      async update(postID,userID,newCaption){
        try{
            const postToUpdate = await PostsModel.findById(new ObjectId(postID));
            if(!postToUpdate) return 0; // No post found
            if(postToUpdate.userId==userID){
                return await PostsModel.findByIdAndUpdate(new ObjectId(postID) , {caption :newCaption});
            }else{
                return -1;   // User not allowed
            }
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
      }
}
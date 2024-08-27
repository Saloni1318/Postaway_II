import mongoose from "mongoose";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
import { commentSchema } from "./comment.schema.js";
import { postSchema } from "../posts/posts.schema.js";


const CommentModel = mongoose.model('Comment' , commentSchema);
const PostsModel = mongoose.model('Post' , postSchema);

export class CommentRepository{
     
    async get(postID){
        try{
            const comments = await CommentModel.find({postID : postID});
            return comments;
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

    async add(comment){
         try{
            const newComment = new CommentModel(comment);
            const postID = comment.postID;
            await PostsModel.findByIdAndUpdate(new ObjectId(postID),{$push : {comments : newComment._id}});
            return await newComment.save();
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

    async delete(id , userID){
        try{
            const comment = await CommentModel.findById(id);
            if(!comment) return "Comment not exists";
            if(comment.userID!=userID) return "This is not your comment";
            await CommentModel.findByIdAndDelete(id);
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

    async update(id , userID , content){
        try{
            const comment = await CommentModel.findById(id);
            if(comment.user!=userID) return "This is not your comment";
            await CommentModel.findByIdAndUpdate({id},{content : content});
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

}
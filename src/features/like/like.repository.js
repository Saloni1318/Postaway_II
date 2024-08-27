import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { ObjectId } from "mongodb";
import { postSchema } from "../posts/posts.schema.js";


const LikeModel = mongoose.model('Like' , likeSchema);
const PostsModel = mongoose.model('Posts' , postSchema);

export class LikeRepository{

    async getLikes(id){
        try{
            return await LikeModel.find({post : new ObjectId(id)}).populate('post').populate('user');
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

    async toggleLike(userID , postID){
        try{
            const like = await LikeModel.findOne({user : userID , post : postID});
            if(!like){
                const newLike = new LikeModel({user : userID , post :postID , status : true});
                await PostsModel.findByIdAndUpdate(new ObjectId(postID),{$push : {likes : newLike._id}});
                return await newLike.save();
            }else{
                if(like.status==true){
                    const id = like._id;
                    return await LikeModel.findByIdAndUpdate(new ObjectId(id),{status: false});
                }else{
                    const id = like._id;
                    return await LikeModel.findByIdAndUpdate(new ObjectId(id),{status: true});   
                }
            }

        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

}
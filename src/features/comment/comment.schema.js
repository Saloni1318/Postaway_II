import mongoose from "mongoose";

export const commentSchema = new mongoose.Schema({
    content : String,
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    postID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Posts'
    }
});
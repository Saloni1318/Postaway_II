import mongoose from "mongoose";

export const postSchema = new mongoose.Schema({
    caption :{
        type : String
    } ,
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    comments :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }],
    likes : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }]
});
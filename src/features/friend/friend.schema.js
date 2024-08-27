import mongoose from "mongoose";

export const friendSchema = new mongoose.Schema({
    
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    
    friends : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }],

    friendsRequests : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
});
import mongoose from 'mongoose';

export const likeSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Posts'
    },
    status : {
        type : Boolean,
        required : true
    }
}).pre('save',(next)=>{
    console.log('New like coming in');
    next();
}).post('save',(doc)=>{
    console.log('Like is saved');
    console.log(doc);
}).pre('find',(next)=>{
    console.log('Retrieving the likes-->>');
    next();
}).post('find',(docs)=>{
    console.log('Retrieved Likes-->>');
    console.log(docs);
})  // Middlewares in mongoose
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name : {type:String , maxLength:[25 , "Name can't be greater than 25 characters"]},
    email : {
        type : String,
        unique : true,
        required:true,
        match : [/.+\@.+\../ , "Please enter a valid email"]
        // match: [/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/ , "Please enter a valid email"]
    },
    password : {
        type: String,
        // validate:{
        //     validator: function(value){
        //         return /^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#]{8,12}$/.test(value);
        //     },
        //     message:"Password should be between 8-12 characters and should have a special character"
        // }
    },
    gender :{
        type : String,
        enum : ['Male' , 'Female' , 'Others']
    },
    otp : {
        type : Number,
        min : 0,
        max : 999999 
    },
    tokens : [{
        type : String
    }],
    pwdToken : {
        type : String
    }
}); 
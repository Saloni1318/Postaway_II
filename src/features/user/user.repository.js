import mongoose, { mongo } from "mongoose";
import { userSchema } from "./user.schema.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import { ObjectId } from "mongodb";

// Creating model from Schema -->>
const UserModel = mongoose.model('User' , userSchema);  // 'User' IS THE COLLECTION NAME.

export default class UserRepository{

    async SignUp(user){
        try{
          // create instance of UserModel-->>
          const newUser = new UserModel(user);
          await newUser.save();
          // return newUser; 
        }catch(err){
          if(err instanceof mongoose.Error.ValidationError){
            throw err;
          }else{
               console.log(err);
              errorHandlerMiddleware(err);
              throw new ApplicationError("Something went wrong with database" , 503);
          }
         
        }
      }

      async SignIn(email,token){
        try{
            // const user = await UserModel.findOne({email});
            await UserModel.findOneAndUpdate({email : email} , {$push : {tokens : token}});
        }catch(err){
          // console.log(err);
          errorHandlerMiddleware(err);
          throw new ApplicationError("Something went wrong with database" , 503);
        }
      }

      async findByEmail(email){
        try{
            return await UserModel.findOne({email});
        }catch(err){
          // console.log(err);
          errorHandlerMiddleware(err);
          throw new ApplicationError("Something went wrong with database" , 503);
        }
      }

      async logout(userID,token){
        try{
            await UserModel.findByIdAndUpdate(new ObjectId(userID) , {$pull :{tokens : token}});
        }catch(err){
          // console.log(err);
          errorHandlerMiddleware(err);
          throw new ApplicationError("Something went wrong with database" , 503);
        }
      }

      async logoutFromAllDevices(userID){
        try{
            await UserModel.findByIdAndUpdate(new ObjectId(userID) , {$set :{'tokens.$[]' : ""}});
        }catch(err){
          // console.log(err);
          errorHandlerMiddleware(err);
          throw new ApplicationError("Something went wrong with database" , 503);
        }
      }

      async getUser(userID){
        try{
            return await UserModel.findById(userID);
      }catch(err){
        // console.log(err);
        errorHandlerMiddleware(err);
        throw new ApplicationError("Something went wrong with database" , 503);
      }
      }

      async getAllUsers(){
        try{
          return await UserModel.find();
      }catch(err){
        // console.log(err);
        errorHandlerMiddleware(err);
        throw new ApplicationError("Something went wrong with database" , 503);
      }
      }

      async updateUser(userID , newName){
        try{
           const user = await UserModel.findByIdAndUpdate(new ObjectId(userID),{name : newName});
           return user;
      }catch(err){
        // console.log(err);
        errorHandlerMiddleware(err);
        throw new ApplicationError("Something went wrong with database" , 503);
      }
      }

}
import mongoose from "mongoose";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import { ApplicationError } from "../../error-handler/applicationError.js";
import { friendSchema } from "./friend.schema.js";

const FriendModel = new mongoose.model('Friend' , friendSchema);

export class FriendRepository{

    async getUserFriends(userId){
        try{
            const allFriends = await FriendModel.find({user : userId}).select('friends').populate('friends');
            return allFriends;
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

    async getPendingFriendsRequests(userID){
        try{
            const allFriends = await FriendModel.find({user : userID}).select('friendsRequests').populate('friendsRequests');
            return allFriends;
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

    async toggleFriendshipStatus(friendId,userID){
        try{
            const result = await FriendModel.find({user : userID});
            if(!result || result.length==0) return "No user found";
            console.log(result);
            if(!result.friends.find(friendId)){
                return await FriendModel.update({user : userID},{$push : {friends : friendId}});
            }else{
                return await FriendModel.update({user : userID},{$pull : {friends : friendId}});
            }
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }

    async responseToRequest(friendId,userID){
        try{
            const friendRequest = await FriendModel.find({user : userID});
            if(!friendRequest || friendRequest.length==0){
                return "No friend request found";
            }
             await FriendModel.update({user : userID},{$pull : {friendsRequests : friendId}});
             return await FriendModel.update({user : userID},{$push : {friends : friendId}});
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with Database",503);
        }
    }
}
import { FriendRepository } from "./friend.repository.js";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";


export default class FriendController{

    constructor(){
        this.friendRepository = new FriendRepository();
    }

    async getFriends(req,res){
        try{
            const userId = req.params.userId;
            const friends = await this.friendRepository.getUserFriends(userId);
            return res.status(200).send(friends);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async getPendingRequests(req,res){
        try{
            const userID = req.userID;
            const pendingRequests = await this.friendRepository.getPendingFriendsRequests(userID);
            return res.status(200).send(pendingRequests);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async toggleFriendship(req,res){
        try{
            const friendId = req.params.friendId;
            const userID = req.userID;
            const result = await this.friendRepository.toggleFriendshipStatus(friendId,userID);
            return res.status(200).send(result);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async responseFriendRequest(req,res){
        try{
            const friendId = req.params.friendId;
            const userID = req.userID;
            const result = await this.friendRepository.responseToRequest(friendId,userID);
            return res.status(200).send(result);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

}
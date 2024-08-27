import { LikeRepository } from "./like.repository.js";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";

export default class LikeController{
    constructor(){
        this.likeRepository = new LikeRepository();
    }

    async getAllLikes(req,res){
        try{
            const id = req.params.id;
            const likes = await this.likeRepository.getLikes(id);
            return res.status(200).send(likes);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async toggleLikeStatus(req,res){
        try{
            const postID = req.params.id;
            const userID = req.userID;
            const result = await this.likeRepository.toggleLike(userID,postID);
            return res.status(201).send(result);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

}
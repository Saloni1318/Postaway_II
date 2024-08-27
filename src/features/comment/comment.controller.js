import { CommentRepository } from "./comment.repository.js";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import CommentModel from "./comment.model.js";

export default class CommentController{
    constructor(){
        this.commentRepository = new CommentRepository();
    }

    async getComments(req,res){
        try{
            const postID = req.params.id;
            const comments = await this.commentRepository.get(postID);
            return res.status(200).send(comments);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async addComment(req,res){
        try{
            const postID = req.params.id;
            const userID = req.userID;
            const {content} = req.body;
            const comment = new CommentModel(postID,userID,content)
            const result = await this.commentRepository.add(comment);
            return res.status(200).send(result);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async deleteComment(req ,res){
        try{
            const id = req.params.id;
            const userID = req.userID;
            const error = await this.commentRepository.delete(id,userID);
            if(error){
                 return res.status(400).send(error);
            }
            return res.status(200).send('Comment has been deleted successfully');
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async updateComment(req,res){
        try{
            const id = req.params.id;
            const userID = req.userID;
            const content = req.body;
            const error = await this.commentRepository.update(id,userID,content);
        if(error){
            return res.status(400).send(error);
        }
        return res.status(200).send('Comment has been updated successfully');
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

}
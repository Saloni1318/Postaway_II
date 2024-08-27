import PostsModel from "./posts.model.js";
import PostsRepository from "./posts.repository.js";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import { ObjectId } from "mongodb";

export default class PostsController{

    constructor(){
        this.postsRepository = new PostsRepository();
    }

    async getAllPosts(req,res){
        try{
            const posts = await this.postsRepository.getAll();
            return res.status(200).send(posts);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async addPost(req, res){
        try{
            const {caption} = req.body;
            const userID = req.userID;
            const newPost = new PostsModel(
                new ObjectId(userID),
                caption,
                req.file.filename,
            );
            const createdRecord=await this.postsRepository.add(newPost);
            res.status(201).send(createdRecord);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
        
    }


    async getOnePost(req,res){
        try{
            const postID = req.params.id;
            const post = await this.postsRepository.get(postID);
            if(!post){
                return res.status(404).send('Post not found');
            } else{
                return res.status(200).send(post);
            }
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async getOneUserPosts(req,res){
        try{
            const userID = req.userID;
            const posts = await this.postsRepository.getUserPosts(userID);
            if(!posts){
                return res.status(404).send("No posts by the User");
            }
            return res.status(200).send(posts);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async deletePost(req,res){
        try{
            const userID = req.userID;
            const postID = req.params.id;
            const response = await this.postsRepository.delete(postID,userID);
            if(response==0) return res.status(404).send("Post not Found");
            if(response==-1) return res.status(400).send("You are not allowed to delete other's posts");
            return res.status(200).send("Deleted");
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
    }

    async updatePost(req,res){
        try{
            const userID = req.userID;
            const postID = req.params.id;
            const {caption} = req.body;
            // const imageUrl = req.file.filename;
            const response = await this.postsRepository.update(postID,userID,caption);
            if(response==0) return res.status(404).send("Post not Found");
            if(response==-1) return res.status(400).send("You are not allowed to update other's posts");
            return res.status(200).send(response);
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(503).send("Something went wrong");
        }
        
    }

   
}
// 1. Import express.
import express from 'express';
import LikeController  from './like.controller.js';

// 2. Initialize Express router.
const likeRouter = express.Router();
const likeController = new LikeController();

// All the paths to the controller methods.
// localhost/api/like
likeRouter.get("/:id", (req, res, next)=>{
    likeController.getAllLikes(req, res, next);
})

likeRouter.get("/toggle/:id", (req, res, next)=>{
    likeController.toggleLikeStatus(req, res, next);
})

export default likeRouter;
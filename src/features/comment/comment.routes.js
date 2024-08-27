// 1. Import express.
import express from 'express';
import  CommentController  from './comment.controller.js';

// 2. Initialize Express router.
const commentRouter = express.Router();
const commentController = new CommentController();

// All the paths to the controller methods.
// localhost/api/comment
commentRouter.get('/:id',(req,res) => {
    commentController.getComments(req,res);
});
commentRouter.post('/:id',(req,res) => {
    commentController.addComment(req,res);
});
commentRouter.delete('/:id',(req,res) => {
    commentController.deleteComment(req,res);
});
commentRouter.put('/:id',(req,res) => {
    commentController.updateComment(req,res);
});

export default commentRouter;
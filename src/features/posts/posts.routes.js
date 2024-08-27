// 1. Import express.
import express from 'express';
import  PostsController  from './posts.controller.js';
import {upload} from '../../middlewares/fileupload.middleware.js';
// import imageUpload from '../../middlewares/fileupload.middleware.js';

// 2. Initialize Express router.
const postsRouter = express.Router();
const postsController = new PostsController();

// All the paths to the controller methods.
// localhost/api/posts
postsRouter.get('/all', (req,res)=>{
    postsController.getAllPosts(req,res);
});
postsRouter.post('/', upload.single('imageUrl'),(req,res)=>{
    postsController.addPost(req,res);
});
// postsRouter.post('/', imageUpload.single('imageUrl'),(req,res) => {
//     postsController.addPost(req,res);
// });
postsRouter.get('/:id', (req,res)=>{
    postsController.getOnePost(req,res);
});
postsRouter.get('/', (req,res)=>{
    postsController.getOneUserPosts(req,res);
});
postsRouter.delete('/:id', (req,res)=>{
    postsController.deletePost(req,res);
});
postsRouter.put('/:id',upload.single('imageUrl') ,(req,res)=>{
    postsController.updatePost(req,res);
});

export default postsRouter;
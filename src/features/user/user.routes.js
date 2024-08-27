// 1. Import express.
import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

// 2. Initialize Express router.
const userRouter = express.Router();
const userController = new UserController();

// All the paths to the controller methods.
// localhost/api/user
userRouter.post('/signup', (req,res,next)=>{
    userController.signUp(req,res,next);
});
userRouter.post('/signin', (req,res)=>{
    userController.signIn(req,res);
});
userRouter.get('/logout',jwtAuth ,(req,res)=>{
    userController.logout(req,res);
});
userRouter.get('/logout-all-devices',jwtAuth, (req,res)=>{
    userController.logoutAllDevices(req,res);
});

userRouter.get('/get-details/:userId',jwtAuth ,(req,res)=>{
    userController.getUserDetails(req,res);
});
userRouter.get('/get-all-details',jwtAuth ,(req,res)=>{
    userController.getAllUsersDetails(req,res);
});
userRouter.put('/update-details/:userId',jwtAuth ,(req,res)=>{
    userController.updateUserDetails(req,res);
});

export default userRouter;
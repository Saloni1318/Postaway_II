// 1. Import express.
import express from 'express';
import FriendController from './friend.controller.js';

// 2. Initialize Express router.
const friendRouter = express.Router();
const friendController = new FriendController();

// All the paths to the controller methods.
// localhost/api/friendship
friendRouter.get('/get-friends/:userId',(req,res) => {
    friendController.getFriends(req,res);
});
friendRouter.get('/get-pending-requests',(req,res) => {
    friendController.getPendingRequests(req,res);
});
friendRouter.post('/toggle-friendship/:friendId',(req,res) => {
    friendController.toggleFriendship(req,res);
});
friendRouter.post('/response-to-request/:friendId',(req,res) => {
    friendController.responseFriendRequest(req,res);
});

export default friendRouter;
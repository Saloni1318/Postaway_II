// 1. Import express.
import express from 'express';
import OtpController from './otp.controller.js';

// 2. Initialize Express router.
const otpRouter = express.Router();
const otpController = new OtpController();

// All the paths to the controller methods.
// localhost/api/otp

// sendOtp is GET request as user requests server to get the OTP
otpRouter.get('/send',(req,res) => {
    otpController.sendOtp(req,res);
});
// verifyOtp is POST request as user sends the OTP that has to be verified by server
otpRouter.post('/verify',(req,res) => {
    otpController.verifyOtp(req,res);
});
otpRouter.put('/reset-password',(req,res) => {
    otpController.resetPassword(req,res);
});

export default otpRouter;
import { OtpRepository } from "./otp.repository.js";
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import bcrypt from 'bcrypt';

export default class OtpController{

    constructor(){
        this.otpRepository = new OtpRepository();
    }

    async sendOtp(req,res){
        try{
           const {email} = req.body;
           await this.otpRepository.sendOTP(email);
           return res.status(200).send("Check your email inbox for OTP");
          }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(400).send("Something went wrong");
        }
    }

    async verifyOtp(req,res){
        try{
           const {email,otp} = req.body;
            const token = await this.otpRepository.verifyOTP(email,otp);
            if(!token) return res.status(401).send("Incorrect OTP");
            return res.status(200).send(token);
          }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(400).send("Something went wrong");
        }
    }

    async resetPassword(req,res){
        const {email, newPassword , token} = req.body;
        const hashedPassword = await bcrypt.hash(newPassword,12);
        try{
            await this.otpRepository.resetPassword(email,hashedPassword,token)
            res.status(200).send("Password is updated");
          }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(400).send("Something went wrong");
        }
    } 
}
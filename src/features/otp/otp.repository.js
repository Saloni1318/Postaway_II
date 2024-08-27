import mongoose from "mongoose";
import { userSchema } from "../user/user.schema.js";
import nodemailer from 'nodemailer';
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";
import { ApplicationError } from "../../error-handler/applicationError.js";


const UserModel = new mongoose.model('User',userSchema)

export class OtpRepository{

    async sendMail(email,OTP){

        // 1. Create an email transporter.
        // SMTP (Simple Mail Transfer Protocol)
        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'<place your email>',
                pass:'<your passcode>'
            }
        });
        
        //2. Configure email content
        const mailOptions = {
            from: '<your email>',
            to: email,
            subject: 'OTP for reset password',
            text: `This is the OTP : ${OTP}`,
        };
        
        // 3. Send the email
        try{
            const result = await transporter.sendMail(mailOptions);
            console.log("Email sent successfully");
            return result;
        }catch(err){
            console.log('Email send failer with error: '+ err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with database", 503);
        }
        }

    async sendOTP(email){
        try{
            //generate otp and send using nodemailer,add the otp to userschema
            const OTP = 100000 + Math.floor(Math.random() * 900000);
            await UserModel.findOneAndUpdate({email : email} ,{otp : OTP});
            // return otp; ..Nodemailer code to send OTP
            return await this.sendMail(email,OTP);
        } catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with database", 503);
        }
    }

    async verifyOTP(email,OTP){
        try{
            // check the otp value in the userschema, match this otp , if matches then proceed...remove otp from userschema
            const user = await UserModel.findOne({email : email});
            const storedOtp = user.otp;
            if(storedOtp!=OTP){
                return "";
            }
            // Can generate random Token , store it in user data, return token
            const token = "thisisyourtoken"
            await UserModel.findOneAndUpdate({email : email} , {pwdToken : token,otp:0});
            return token;

        } catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with database", 503);
        }
    }

    async resetPassword(email, hashedPassword,token){
        try{
            let user = await UserModel.findOne({email : email});
            if(user){
                if(user.pwdToken==token){
                    user.password=hashedPassword;
                    user.pwdToken="";
                    user.save();
                }
                else{
                    throw new Error("First verify email by otp and get token");
                }
            }else{
                throw new Error("No such user found");
            }
            
        } catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            throw new ApplicationError("Something went wrong with database", 503);
        }
    }

}
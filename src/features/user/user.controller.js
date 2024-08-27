import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken'
import UserRepository from "./user.repository.js";
import bcrypt from 'bcrypt';
import { errorHandlerMiddleware } from "../../error-handler/errorHandler.js";

export default class UserController{

    constructor(){
        this.userRepository = new UserRepository();
    }

   async signUp(req,res,next){
        // console.log(req.body);
        const {name , email , password ,gender} = req.body;
        const hashedPassword = await bcrypt.hash(password,12) 
        const newUser = new UserModel(name,email,hashedPassword,gender);
        try{
            await this.userRepository.SignUp(newUser);
            return  res.status(201).send(newUser);
        }catch(err){
            // console.log(err);
            errorHandlerMiddleware(err);
            next(err);
        }
        
    }
    async signIn(req,res){
        try{
            const {email,password} = req.body;
            const user = await this.userRepository.findByEmail(email);
            if(!user){
                return res.status(400).send("Incorrect Credentials")
            }else{
                //  Compare user password with Hashed password -->>
                const result = await bcrypt.compare(password,user.password);
                if(result){
                    // 1. Create Token
                 const token = jwt.sign(
                    {
                        // Payload (Should not contain sensitve info like pwd) -->>
                        userID : user._id,
                        email : user.email
                    },
                    // Secret Key-->>
                    process.env.JWT_SECRET,
                    {
                        // Options-->>
                        expiresIn: '1h',
                    }
                )
    
                // 2. Send and store Token in user's document
                await this.userRepository.SignIn(email , token);
                res.status(200).send(token);
    
                // res.status(201).send("Login Successful");
                }
                else{
                    res.status(400).send("Incorrect Credentials")
                }
            }
           
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(200).send("Something went wrong");
        }
    }

    async logoutAllDevices(req,res){
        try{    
                await this.userRepository.logoutFromAllDevices(req.userID);
                res.status(200).send('Logged Out from all devices');
           
        }catch(err){
            console.log(err);
            errorHandlerMiddleware(err);
            return res.status(500).send("Something went wrong");
        }
    }

    async logout(req,res){
        try{
            const token = req.headers['Authorization'];
            await this.userRepository.logout(req.userID , token);
            res.status(200).send('Logged Out');
       
       }catch(err){
          console.log(err);
          errorHandlerMiddleware(err);
          return res.status(500).send("Something went wrong");
       }
    }

    async getUserDetails(req,res){
        try{
            const userId = req.params.userId;
            const user = await this.userRepository.getUser(userId);
            if(!user){
                return res.status(404).send("User not found");
            }
            res.status(200).send(user);
       }catch(err){
          console.log(err);
          errorHandlerMiddleware(err);
          return res.status(200).send("Something went wrong");
       }
    }

    async getAllUsersDetails(req,res){
        try{
            const users = await this.userRepository.getAllUsers();
            if(!users){
                return res.status(404).send("User not found");
            }
            res.status(200).send(users);
       }catch(err){
          console.log(err);
          errorHandlerMiddleware(err);
          return res.status(200).send("Something went wrong");
       }   
    }

    async updateUserDetails(req,res){
        try{
            const userId = req.params.userId;
            const {name} = req.body;
            const user = await this.userRepository.updateUser(userId,name);
            if(!user){
                return res.status(404).send("User not found");
            }
            res.status(200).send("Details updated");
       }catch(err){
          console.log(err);
          errorHandlerMiddleware(err);
          return res.status(200).send("Something went wrong");
       }
    }
}
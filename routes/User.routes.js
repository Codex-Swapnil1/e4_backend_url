const express = require('express');

const bcrypt = require('bcrypt');
const jwt =require("jsonwebtoken");
const { UserModel } = require('../model/User.model');
require("dotenv").config();
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {

    const { name ,email,gender,password,age,city} = req.body;
    try {
        bcrypt.hash(password,5,async(err,sec_password)=>{
            if(err){
                console.log(err);
            }else{
                const user = new UserModel({name,email,password:sec_password,gender,age,city})
               await user.save();
                res.send({"msg":"User Registered successfully"})
            }
        })
    } catch (error) {
        res.send({"msg":"Error in registring user"})
        console.log(error)
    }
})

userRouter.post("/login", async(req, res)=>{
    const {email,password} = req.body
    console.log(email,password);
    try {
        const user = await UserModel.find({email})
        const secured_password = user[0].password
        if(user.length>0){
            bcrypt.compare(password, secured_password,(err,result)=>{
                if(err){
                    console.log(err);
                    res.send({"msg":"Wrong Credentials"});
                }else{
                    const token = jwt.sign({userId:user[0]._id},process.env.key)
                    res.send({"msg":"Login Sucessfully","token": token});
                }
            })
        }
    } catch (error) {
        console.log(error);
        res.send({"msg":"Something wnet wrong in login"})
    }
})

module.exports = {
    userRouter
}



const express = require('express');
const { PostModel } = require('../model/Post.model');

const postRouter = express.Router();

postRouter.get("/",async (req,res)=>{
const device = req.query.device
if(device){
     try {
            const posts = await PostModel.find({"device":device})
            res.send(posts)
        } catch (error) {
            console.log(error)
            res.send({"msg":"Something went wrong with post get request"})
        }
}
else{
    try {
    const posts = await PostModel.find()
    res.send(posts)
} catch (error) {
    console.log(error)
    res.send({"msg":"Something went wrong with post get request"})
}}

})

postRouter.post("/create",async (req,res)=>{
    const payload = req.body
    try {
        const new_post = await PostModel(payload)
        await new_post.save()
        res.send("Created new post")
    } catch (error) {
        console.log(error)
        res.send({"msg":"Something went wrong with adding post"})
    }
})

postRouter.patch("/update/:id",async(req, res)=>{
    const payload = req.body
    const id = req.params.id
    const post = await PostModel.findOne({"_id":id})
    const userID_in_post = post.userID
    const userID_making_request = req.body.userID
    try {
        if(userID_making_request !==userID_in_post){
            res.sendStatus("Your Not Authorized")
        }else{
            await PostModel.findByIdAndUpdate({"_id":id,payload})
            res.send({"msg":"Updated post"})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Error in patch request"})
    }

})

postRouter.delete("/delete/:id",async(req, res)=>{
    const id = req.params.id
    const post = await PostModel.findOne({"_id":id})
    const userID_in_post = post.userID
    const userID_making_request = req.body.userID
    try {
        if(userID_making_request !==userID_in_post){
            res.sendStatus("Your Not Authorized")
        }else{
            await PostModel.findByIdAndDelete({"_id":id})
            res.send({"msg":"Deleted post"})
        }
    } catch (error) {
        console.log(error)
        res.send({"msg":"Error in delete request"})
    }

})
module.exports = {
    postRouter
}
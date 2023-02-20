const mongoose = require('mongoose');

const userScema = mongoose.Schema({
name : String,
email : String,
gender : String,
password : String,
age : Number,
city : String
})

const UserModel = mongoose.model("user",userScema)
module.exports = {
    UserModel
}
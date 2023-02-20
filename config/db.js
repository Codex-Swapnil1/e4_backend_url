const mongoose = require('mongoose');
require("dotenv").config();

const connection = mongoose.connect(process.env.MongoDb_url);

module.exports={
    connection
}
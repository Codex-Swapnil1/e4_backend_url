const express = require('express');
const { connection } = require('./config/db');
const { authentication } = require('./middleware/authentication.middleware');
const { postRouter } = require('./routes/Post.routes');
const { userRouter } = require('./routes/User.routes');
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcom to the Linkedin App")
})
app.use("/users",userRouter)
app.use(authentication)
app.use("/posts",postRouter)

app.listen(process.env.Port,async()=>{
    try {
        await connection
        console.log(`connected to the port ${process.env.Port}`)
    } catch (error) {
        console.log(`Failed to connect to port ${process.env.Port}`);
        console.log(error);
    }
})
const express = require("express");
const { apiRoute, apiProtected } = require("./src/routes/api")
require('dotenv').config()
const { default: mongoose } = require("mongoose");
const { authMiddleware } = require("./src/middleware/auth");
const app = express()
const PORT = 8050;
const cors = require("cors");
// const connectDB = require("./src/config/dbConnect");
// connectDB()   some error while importing
mongoose.connect("mongodb+srv://bhushanchavan:eWhut6Qo4Z3979hN@cluster1.ztqa1jw.mongodb.net/")
app.use(cors())
app.use(express.json())
app.use("/api/",apiRoute)
app.use("/api/",authMiddleware,apiProtected)

app.listen(PORT,()=>{
    try {
        console.log("server running");
    } catch (error) {
        console.log(error);
    }
})
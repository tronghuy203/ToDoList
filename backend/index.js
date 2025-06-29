const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const connectdb = require("./config/connectDB")
const authRoute = require("./router/auth");
const userRoute = require("./router/user");
const todolistRoute = require("./router/todolist");

const app = express();

connectdb();


app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/v1/auth", authRoute);
app.use("/v1/user", userRoute);
app.use("/v1/todolist", todolistRoute);

app.listen(8000,()=>{
    console.log("Server is running")
})
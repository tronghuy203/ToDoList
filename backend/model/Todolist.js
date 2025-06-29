const mongoose = require("mongoose");
const User = require("./User");

const TodolistSchema = new mongoose.Schema({
    UserId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        require: true,
    },
    Title: {
        type: String,
        require: true,
    },
    Content: {
        type: String,
        require: true,
    },
},{timestamps: true})

module.exports = mongoose.model("Todolist",TodolistSchema);
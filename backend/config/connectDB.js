const mongoose = require("mongoose");

async function connect(){
    try {
        await mongoose.connect("mongodb://localhost:27017/todolist");
        console.log("Connect Db success");
    } catch (error) {
        console.log("Connect Db fail");
    }
}


module.exports = connect;
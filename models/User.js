const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:String,
    regId:Number,
    email:String,
    username:String,
    password:String
})

module.exports = mongoose.model("User",userSchema)
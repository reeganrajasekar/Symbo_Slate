const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    title:String,
    desc:String,
    url:String,
    stime:Date,
    etime:Date
})

module.exports = mongoose.model("Event",eventSchema)
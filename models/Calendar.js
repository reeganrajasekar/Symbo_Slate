const mongoose = require('mongoose');
const calSchema = new mongoose.Schema({
    userid:String,
    eventid:String,
    stime:Date,
    etime:Date
})

module.exports = mongoose.model("Calendar",calSchema)
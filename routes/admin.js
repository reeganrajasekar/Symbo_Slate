var express = require('express');
var router = express.Router();
const Event = require("../models/Event");

router.use((req, res, next) => {
    if(req.cookies.user == "#684687652tfgh65465fhjgcy5#"){
        next()
    }else{
        res.clearCookie("user");
        res.redirect("/")
    }
})

router.get('/',(req, res)=>{
    Event.find().sort({'_id': -1 }).exec((err,data)=>{
        res.render("admin/index",{data:data});
    })
})

router.get('/addEvent',(req, res)=>{
    res.render("admin/addEvent");
})  

router.post('/addEvent',(req,res)=>{
    var events = new Event({
        title:req.body.title,
        desc:req.body.desc,
        url:req.body.url,
        stime:req.body.date+" "+req.body.stime,
        etime:req.body.date+" "+req.body.etime
    })
    events.save();
    res.redirect("/admin");
})

router.get("/editEvent/:id",(req,res)=>{
    Event.find({"_id":req.params.id}).exec((err,data)=>{
        res.render("admin/editEvent",{data:data});
    })
})

router.post('/editEvent/:id',(req,res)=>{
    Event.findByIdAndUpdate(req.params.id, { 
        title:req.body.title,
        desc:req.body.desc,
        url:req.body.url,
        stime:req.body.date+" "+req.body.stime,
        etime:req.body.date+" "+req.body.etime
    },()=>{
        res.redirect("/admin/")
    })
})

router.get("/deleteEvent/:id",(req,res)=>{
    Event.findByIdAndDelete(req.params.id,()=>{
        res.redirect("/admin/")
    })
})

module.exports = router;
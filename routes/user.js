var express = require('express');
var router = express.Router();
const User = require("../models/User");
const Event = require("../models/Event");
const Calendar = require("../models/Calendar");


router.use((req, res, next) => {
    User.findById(req.cookies.user,(err,data)=>{
        if(data!=null){
            next()
        }else{
            res.clearCookie("user");
            res.redirect("/")
        }
    })
})

router.get('/',(req, res)=>{
    Event.find().sort({'_id': -1 }).exec((err,data)=>{
        Calendar.find({userid:req.cookies.user}).sort({'_id':-1}).exec((err,shel)=>{
            User.find({_id:req.cookies.user}).exec((err,name)=>{
                res.render("user/index",{data:data,shel:shel,name:name,err:false});
            })
        })
    })
})

router.get('/calendar',(req, res)=>{
    Event.find().sort({'_id': -1 }).exec((err,data)=>{
        Calendar.find({userid:req.cookies.user}).sort({'_id':-1}).exec((err,shel)=>{
            User.find({_id:req.cookies.user}).exec((err,name)=>{
                res.render("user/calander",{data:data,shel:shel,name:name});
            })
        })
    })
})

router.get('/addCalendar/:id/:stime/:etime',(req,res)=>{
    calendar = new Calendar({
        userid:req.cookies.user,
        eventid:req.params.id,
        stime:req.params.stime,
        etime:req.params.etime
    })
    Calendar.find({userid:req.cookies.user}).exec((err,i)=>{
        function ceck(data) {
            x = new Date(req.params.stime);
            xyz = new Date(req.params.etime);
            y = new Date(data.stime)
            z = new Date(data.etime)
            return  xyz>=y && xyz<=z || x>=y && x<=z
        }
        if(i.find(ceck)){
            Event.find().sort({'_id': -1 }).exec((err,data)=>{
                Calendar.find({userid:req.cookies.user}).sort({'_id':-1}).exec((err,shel)=>{
                    User.find({_id:req.cookies.user}).exec((err,name)=>{
                        res.render("user/index",{data:data,shel:shel,name:name,err:true});
                    })
                })
            })
        }else{
            calendar.save((err,data)=>{
                res.redirect("/user/")     
            });
        }
    })
    
})

router.get('/removeCalendar/:id',(req,res)=>{
    Calendar.findByIdAndDelete(req.params.id,()=>{
        res.redirect("/user/calendar")
    })
})


module.exports = router;
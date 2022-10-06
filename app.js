const express = require("express");
const app = express();
const users = require("./routes/user");
const admin = require("./routes/admin");

var bodyParser = require('body-parser');  
app.use(bodyParser.urlencoded({ extended: false }))  ;

var cookieParser = require('cookie-parser');
app.use(cookieParser());

app.set('view engine','ejs')
app.use(express.static('public'))

const mongoose = require('mongoose');
const User = require("./models/User");

mongoose.connect('mongodb://localhost:27017/symboslate',(e)=>{
    if(e) console.log(e)
});

app.get("/",(req,res)=>{
    if (req.cookies.user) {
        if (req.cookies.user == "#684687652tfgh65465fhjgcy5#") {
            res.redirect("/admin/")
        } else {
            res.redirect("/user/")
        }
    } else {
        res.render("index",{login:false,register:false});       
    }
})

app.post("/login",(req,res)=>{
    if(req.body.uname=="admin@admin" && req.body.password=="adminadmin"){
        res.cookie("user","#684687652tfgh65465fhjgcy5#");
        res.redirect("/admin/")
    }else{
        User.find({username:req.body.uname , password:req.body.password},(err,data)=>{
            if(data.length === 0){
                res.render("index",{login:true,register:false});       
            }else{
                res.cookie("user",data[0]._id);
                res.redirect("/user")             
            }
        });
    }
})

app.post("/register",(req,res)=>{
    User.find({username:req.body.uname},(err,data)=>{
        if(data.length === 0){
            user = new User({
                name:req.body.name,
                regId:req.body.regId,
                email:req.body.email,
                username:req.body.uname,
                password:req.body.passwd
            })
            user.save((err,data)=>{
                res.cookie("user",data._id);
                res.redirect("/user/")     
            });
        }else{
            res.render("index",{login:false,register:true});      
        }
    });
})


app.get('/logout', (req, res)=>{
    res.clearCookie("user");
    res.redirect("/")
})

app.use('/user', users);
app.use('/admin', admin);

app.listen(3000 , (err)=>{
    if(err){
        console.log(err);
    }
    console.log("Server Started");
})
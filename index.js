const express = require("express");
const mongoose = require('mongoose');

const methodOverride= require("method-override")
const boyler= require("ejs-mate");
const path = require('path'); 
const session =require("express-session")
const passport = require("passport");
const Localstrategy = require("passport-local");
const flash=require("connect-flash");
//const { log } = require("console");
//const AsynExceHand= require("./utils/AsynExcepHandler.js");

const user= require("./routes/user.js")
const allthing= require("./routes/allthing.js");
const usermodal = require("./module/usermodal.js");

mongoose.connect('mongodb://127.0.0.1:27017/newdata').then(() => console.log('Connected!'));
 
const app= express();

app.use(session({secret:"anystringsecrete",resave:false,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(usermodal.authenticate()));
passport.serializeUser(usermodal.serializeUser());
passport.deserializeUser(usermodal.deserializeUser());

app.use(flash());
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine('ejs',boyler);
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');             
  res.locals.fail_msg = req.flash('fail_msg');
  res.locals.message = req.flash('message');

  res.locals.error = req.flash('error'); // Use this for passport error messages its value set by passport when somthing happend bad
 res.locals.currentuser=req.user;     //use in home to show login and logout and varifi edit and delete button
 
  next();
});


app.use("/user",user);
app.use("/allthing",allthing);


  
app.use((err,req,res,next)=>{
  res.render("error/error.ejs",{err} )
  console.log(err);
  
})


 
app.listen(3000,()=>{
    console.log("run");
    
})


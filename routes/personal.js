const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/users');


router.get('/', ensureAuthenticated, (req, res)=> {
  var name=req.user.name;
  var user = User.findOne({name:name}).sort({"_id": -1});

  user.exec(function(err,data){
      if(err) throw err;
    res.render('personal',{title: 'E-Profile', records:data, user: req.user, success:''});
    });
  });
  
  router.post('/',ensureAuthenticated,(req, res, next)=> {
    var name=req.user.name;
    var user = User.findOne({name:name}).sort({"_id": -1});

    var passcat_id=req.user._id;
    var uname=req.body.uname;
    var profess=req.body.profess;
    var phnum=req.body.phnum;
    var mail=req.body.mail;
    var addr=req.body.addr;
    var fbid=req.body.fbid;
    var twid=req.body.twid;
    var gitid=req.body.gitid;
    var linid=req.body.linid;
    var user_name=req.body.user_name;
  
  //   var personalDetails=new personalModel({
      // username:username,
      // profession:profession,
      // contactnumber:contactnumber,
      // email:email,
      // address:address,
      // facebook:facebook,
      // twitter:twitter,
      // github:github,
      // linkedin:linkedin,
      // user_name:user_name
  //   });
  
  // personalDetails.save((err,doc)=>{
  //   if(err) throw err;
  //   res.redirect('/personal');
  // })  ;

  var update_passCat= User.findByIdAndUpdate(passcat_id,{ uname:uname,
    profess:profess,
    phnum:phnum,
    mail:mail,
    addr:addr,
    fbid:fbid,
    twid:twid,
    gitid:gitid,
    linid:linid,
    user_name:user_name});
   update_passCat.exec(function(err,doc){
    user.exec(function(err,data){
      if(err) throw err;
    res.render('personal',{title: 'E-Profile', records:data, user: req.user, success:'Updated Successfully'});
    });
    });
  
  });

  
  module.exports = router;
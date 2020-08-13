const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/users');

router.get('/', ensureAuthenticated, (req, res)=> {
  var name=req.user.name;
  var user = User.findOne({name:name}).sort({"_id": -1});

  user.exec(function(err,data){
      if(err) throw err;
    res.render('about',{title: 'E-Profile', records:data, user: req.user, success:''});
    });
  });
  
  router.post('/',ensureAuthenticated,(req, res, next)=> {
    var name=req.user.name;
    var user = User.findOne({name:name}).sort({"_id": -1});

    var passcat_id=req.user._id;
    var about=req.body.about;
  
  //   var aboutDetails=new aboutModel({
  //     about:about,
  //     user_name:user_name
  //   });
  
  //   aboutDetails.save((err,doc)=>{
  //   if(err) throw err;
  //   res.render('about',{user: req.user});
  // })  ;

  var update_passCat= User.findByIdAndUpdate(passcat_id,{ about:about});

   update_passCat.exec(function(err,doc){
    user.exec(function(err,data){
      if(err) throw err;
    res.render('about',{title: 'E-Profile', records:data, user: req.user, success:'Updated Successfully'});
    });
    });
  
  });

module.exports = router;
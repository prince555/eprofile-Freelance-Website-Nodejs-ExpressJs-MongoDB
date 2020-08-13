const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var profModel=require('../models/prof');

router.get('/', ensureAuthenticated, (req, res)=> {
  var name=req.user.name;
  var prof = profModel.find({user_name:name}).sort({"_id": -1});

  prof.exec(function(err,data){
    if(err) throw err;
    res.render('professional',{user: req.user,records:data, success:''});
  })
  });
  
  router.post('/',ensureAuthenticated,(req, res, next)=> {
    var name=req.user.name;
    var prof = profModel.find({user_name:name}).sort({"_id": -1});

    var fname=req.body.fname;
    var fpercent=req.body.fpercent;
    var user_name=req.body.user_name;
  
    var profDetails=new profModel({
      fname:fname,
      fpercent:fpercent,
      user_name:user_name
    });
  
    profDetails.save((err,doc)=>{
      prof.exec(function(err,data){
        if(err) throw err;
        res.render('professional',{user: req.user,records:data, success:'Submitted Successfully'});
      });
  })  ;
  
  });

  router.get('/delete/:id', ensureAuthenticated,(req, res, next) =>{
    var name=req.user.name;
    var prof = profModel.find({user_name:name}).sort({"_id": -1});
    
    var id =req.params.id;
    var passdelete=profModel.findByIdAndDelete(id);
    passdelete.exec(function(err){
      prof.exec(function(err,data){
        if(err) throw err;
        res.render('professional',{user: req.user,records:data, success:'Deleted Successfully'});
      });
    });
  });

  router.get('/edit/:id', ensureAuthenticated,(req, res, next) =>{
    var passcat_id=req.params.id;
    var getpassCategory=profModel.findById(passcat_id);
    getpassCategory.exec(function(err,data){
      if(err) throw err;
   
      res.render('edit_professional', { records:data,id:passcat_id,user: req.user});
  
    });
  });
  
  router.post('/edit/', ensureAuthenticated,(req, res, next) =>{
    var name=req.user.name;
    var prof = profModel.find({user_name:name}).sort({"_id": -1});

    var passcat_id=req.body.id;
    var sname=req.body.sname;
    var percent=req.body.percent;

   var update_passCat= profModel.findByIdAndUpdate(passcat_id,{fname:sname, fpercent:percent});
   update_passCat.exec(function(err,doc){
    prof.exec(function(err,data){
      if(err) throw err;
      res.render('professional',{user: req.user,records:data, success:'Updated Successfully'});
    });
    });
  });

module.exports = router;
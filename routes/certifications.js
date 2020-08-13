const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var certifiModel=require('../models/certifications');

var certi = certifiModel.find({});

router.get('/', ensureAuthenticated, (req, res)=> {
  var name=req.user.name;
  var certi = certifiModel.find({user_name:name}).sort({"_id": -1});

  certi.exec(function(err,data){
    if(err) throw err;
    res.render('certifications',{user: req.user,records:data, success:''});
  });
  });
  
  router.post('/',ensureAuthenticated,(req, res, next) =>{
    var name=req.user.name;
    var certi = certifiModel.find({user_name:name}).sort({"_id": -1});

    var qualification=req.body.equalif;
    var eschool=req.body.eschool;
    var ebatch=req.body.ebatch;
    var edetails=req.body.edetails;
    var user_name=req.body.user_name;
  
    var certifiDetails=new certifiModel({
      qualif:qualification,
      eschool:eschool,
      ebatch:ebatch,
      edetails:edetails,
      user_name:user_name
    });
  
    certifiDetails.save((err,doc)=>{
      certi.exec(function(err,data){
        if(err) throw err;
        res.render('certifications',{user: req.user,records:data, success:'Submitted Successfully'});
      });
  })  ;
  
  });

  router.get('/delete/:id', ensureAuthenticated,(req, res, next) =>{
    var name=req.user.name;
  var certi = certifiModel.find({user_name:name}).sort({"_id": -1});
    
    var id =req.params.id;
    var passdelete=certifiModel.findByIdAndDelete(id);
    passdelete.exec(function(err){
      certi.exec(function(err,data){
        if(err) throw err;
        res.render('certifications',{user: req.user,records:data, success:'Deleted Successfully'});
      });
    });
  });

  router.get('/edit/:id', ensureAuthenticated,(req, res, next) =>{
    var passcat_id=req.params.id;
    var getpassCategory=certifiModel.findById(passcat_id);
    getpassCategory.exec(function(err,data){
      if(err) throw err;
   
      res.render('edit_certifications', { records:data,id:passcat_id,user: req.user});
  
    });
  });
  
  router.post('/edit/', ensureAuthenticated,(req, res, next) =>{
    var name=req.user.name;
    var certi = certifiModel.find({user_name:name}).sort({"_id": -1});

    var passcat_id=req.body.id;
    var qualification=req.body.qualification;
    var eschool=req.body.eschool;
    var ebatch=req.body.ebatch;
    var edetails=req.body.edetails;

   var update_passCat= certifiModel.findByIdAndUpdate(passcat_id,{qualif:qualification, eschool:eschool,ebatch:ebatch,edetails:edetails});
   update_passCat.exec(function(err,doc){
    certi.exec(function(err,data){
      if(err) throw err;
      res.render('certifications',{user: req.user,records:data, success:'Updated Successfully'});
    });
    });
  });

module.exports = router;
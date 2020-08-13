const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var techModel=require('../models/tech');

router.get('/', ensureAuthenticated, (req, res)=> {
  var name=req.user.name;
  var technical = techModel.find({user_name:name}).sort({"_id": -1});

    technical.exec(function(err,data){
      if(err) throw err;
    res.render('technical',{title: 'E-Profile', records:data, user: req.user, success:''});
    });
  });
  
  router.post('/',ensureAuthenticated,(req, res, next)=> {
    var name=req.user.name;
    var technical = techModel.find({user_name:name}).sort({"_id": -1});

    var sname=req.body.sname;
    var percent=req.body.percent;
    var user_name=req.body.user_name;
  
    var techDetails=new techModel({
      sname:sname,
      percent:percent,
      user_name:user_name
    });
  
    techDetails.save((err,doc)=>{
      technical.exec(function(err,data){
    if(err) throw err;
    res.render('technical',{title: 'E-Profile', records:data, user: req.user,success:"Submited Successfully"});
  });
  })  ;
  
  });

  router.get('/delete/:id', ensureAuthenticated,(req, res, next) =>{
    var name=req.user.name;
  var technical = techModel.find({user_name:name}).sort({"_id": -1});
    
    var id =req.params.id;
    var passdelete=techModel.findByIdAndDelete(id);
    passdelete.exec(function(err){
      technical.exec(function(err,data){
        if(err) throw err;
        res.render('technical',{title: 'E-Profile', records:data, user: req.user,success:"Deleted Successfully"});
      });
    });
  });

  router.get('/edit/:id', ensureAuthenticated,(req, res, next) =>{
    var passcat_id=req.params.id;
    var getpassCategory=techModel.findById(passcat_id);
    getpassCategory.exec(function(err,data){
      if(err) throw err;
   
      res.render('edit_technical', { records:data,id:passcat_id,user: req.user});
  
    });
  });
  
  router.post('/edit/', ensureAuthenticated,(req, res, next) =>{
    var name=req.user.name;
    var technical = techModel.find({user_name:name}).sort({"_id": -1});

    var passcat_id=req.body.id;
    var sname=req.body.sname;
    var percent=req.body.percent;

   var update_passCat= techModel.findByIdAndUpdate(passcat_id,{sname:sname, percent:percent});
   update_passCat.exec(function(err,doc){
    technical.exec(function(err,data){
      if(err) throw err;
      res.render('technical',{title: 'E-Profile', records:data, user: req.user,success:"Updated Successfully"});
    });
    });
  });

module.exports = router;
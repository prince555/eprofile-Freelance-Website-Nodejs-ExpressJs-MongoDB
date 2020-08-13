const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var techModel=require('../models/tech');
var profModel=require('../models/prof');
var eduModel=require('../models/education');
var workModel=require('../models/work');
var certifiModel=require('../models/certifications');
var achievModel=require('../models/achiev');
var projectModel=require('../models/proj');
const User = require('../models/users');
var conModel=require('../models/contact');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('index'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/messages', ensureAuthenticated, (req, res)=> {
  var name=req.user.name;
  var cont = conModel.find({user_name:name}).sort({"_id": -1});
  cont.exec(function(err,data){
    if(err) throw err;
    res.render('contact',{user: req.user,records:data, success:''});
  });
  });

  router.post('/messages',function(req, res, next) {
    var name=req.body.user_name;
  var achiev = conModel.find({user_name:name}).sort({"_id": -1});

    var qualification=req.body.equalif;
    var eschool=req.body.eschool;
    var ebatch=req.body.ebatch;
    var edetails=req.body.edetails;
    var user_name=req.body.user_name;
  
    var achievDetails=new conModel({
      qualif:qualification,
      eschool:eschool,
      ebatch:ebatch,
      edetails:edetails,
      user_name:user_name
    });
  
    achievDetails.save((err,doc)=>{
      achiev.exec(function(err,data){
        if(err) throw err;
        var user_name=req.body.user_name;
        res.redirect('/name/'+user_name);
      });
  })  ;
  
  });


router.get('/signin', function (req, res) {
  res.render('signin')
});

router.get('/register', function (req, res) {
  res.render('signup',{msg:''})
});

router.get('/home', function (req, res) {
  res.render('index')
});

router.get('/name/:name', function (req, res) {

  var name=req.params.name;
console.log(name);
  var technical = techModel.find({user_name:name}).sort({"_id": -1});
  var prof = profModel.find({user_name:name}).sort({"_id": -1});
  var edu = eduModel.find({user_name:name}).sort({"_id": -1});
  var work = workModel.find({user_name:name}).sort({"_id": -1});
  var certi = certifiModel.find({user_name:name}).sort({"_id": -1});
  var achiev = achievModel.find({user_name:name}).sort({"_id": -1});
  var project = projectModel.find({user_name:name}).sort({"_id": -1});
  var user = User.findOne({name:name}).sort({"_id": -1});

  technical.exec(function(err,tech){
    prof.exec(function(err,prof){
      edu.exec(function(err,edu){
        work.exec(function(err,work){
          certi.exec(function(err,certi){
            achiev.exec(function(err,achiev){
              project.exec(function(err,project){
                user.exec(function(err,data){
    if(err) throw err;
  res.render('profile',{user: req.user, title: 'E-Profile',success:'', records:data, tech:tech, prof:prof, edu:edu, work:work, certi:certi, achiev:achiev, project:project})
            })
            })
          })
          })
        })
      })
    })
})
});


module.exports = router;

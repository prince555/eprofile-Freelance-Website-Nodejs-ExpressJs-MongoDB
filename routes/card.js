const express = require('express');
const router = express.Router();
var multer  = require('multer');
var path = require('path');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var uploadModal=require('../models/users');

// router.get('/', ensureAuthenticated, (req, res)=> {
//     res.render('card',{user: req.user})
//   });

router.use(express.static(__dirname+"./public/"));

if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

  var Storage=multer.diskStorage({
    destination:"./public/uploadings/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  
  var upload = multer({
    storage:Storage
  }).single('imagename');

  router.post('/',upload, ensureAuthenticated,(req, res, next)=> {
    var name=req.user.name;
  var imageData = uploadModal.findOne({name:name}).sort({"_id": -1});

    var passcat_id=req.user._id;
    var imageFile=req.file.filename;
  
    // var imageDetails=new uploadModal({
    //   imagename:imageFile
    // });
  
    // imageDetails.save(function(err,doc){
    //   if(err) throw err;

      var imageData1=uploadModal.findByIdAndUpdate(passcat_id,{ imagename:imageFile});
  
      imageData1.exec(function(err,data){
        imageData.exec(function(err,data){
        if(err) throw err;    
        res.render('card', { title: 'card' ,records:data, success:'Updated Successfully',user: req.user });
      });
    });
  });
  
  router.get('/', ensureAuthenticated,(req, res, next)=> {
    var name=req.user.name;
  var imageData = uploadModal.findOne({name:name}).sort({"_id": -1});

    imageData.exec(function(err,data){
      if(err) throw err;
      res.render('card', { title: 'card' ,records:data, success:'',user: req.user });
    }); 
  });

  
module.exports = router;
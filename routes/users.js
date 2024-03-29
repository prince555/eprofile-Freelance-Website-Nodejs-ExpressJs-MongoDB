const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/users');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));



// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register',{msg:''}));

function checkUsername(req,res,next){
  var name=req.body.name;
  var checkexitemail=User.findOne({name:name});
  checkexitemail.exec((err,data)=>{
 if(err) throw err;
 if(data){
  
return res.render('register', { msg:'Username Already Exit' });

 }
 next();
  });
}

// Register
router.post('/register',checkUsername, (req, res) => {
  const { name, email, password, password2, uname, profess,
    phnum, mail, addr, fbid, twid, gitid, linid,about,user_name,imagename} = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('signup', {
      errors,
      name,
      email,
      password,
      password2,
      uname, 
      profess,
      phnum, 
      mail, 
      addr, 
      fbid, 
      twid, 
      gitid,
      linid,
      about,
      user_name,
      imagename,
      msg:''
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('signup', {
          errors,
          name,
          email,
          password,
          password2,
          uname, 
          profess,
          phnum, 
          mail, 
          addr, 
          fbid, 
          twid, 
          gitid,
          linid,
          about,
      user_name,
      imagename,
          msg:''
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
          uname, 
          profess,
          phnum, 
          mail, 
          addr, 
          fbid, 
          twid, 
          gitid,
          linid,
          about,
      user_name,
      imagename
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/signin');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/card',
    failureRedirect: '/signin',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/signin');
});

module.exports = router;

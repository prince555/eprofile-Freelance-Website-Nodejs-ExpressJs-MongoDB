var createError = require('http-errors');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
var path = require('path');

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// var indexRouter = require('./routes/profile');

// app.use('/profile', indexRouter);

// Routes
app.use('/', require('./routes/index.js'));
// app.use('/profile', require('./routes/profile.js'));
// app.use('/profile/name', require('./routes/profile.js'));
app.use('/users', require('./routes/users.js'));
app.use('/card', require('./routes/card.js'));
app.use('/personal', require('./routes/personal.js'));
app.use('/about', require('./routes/about.js'));
app.use('/technical', require('./routes/technical.js'));
app.use('/professional', require('./routes/professional.js'));
app.use('/education', require('./routes/education.js'));
app.use('/work', require('./routes/work.js'));
app.use('/certifications', require('./routes/certifications.js'));
app.use('/achievements', require('./routes/achievements.js'));
app.use('/education', require('./routes/education.js'));
app.use('/projects', require('./routes/projects.js'));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

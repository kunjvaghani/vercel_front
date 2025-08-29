var express = require('express');
require('dotenv').config();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors'); 
const mongoose = require('mongoose');


var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var authRoutes = require('./routes/auth');
var authscholarship = require('./routes/scholarship');
var userRoutes = require('./routes/users'); 
var adminRoutes = require('./routes/admin'); // Import the admin routes

// Tell Express to use the auth routes for any URL starting with /api/auth
var app = express();


const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('MongoDB connected successfully!');
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/auth', authRoutes);
app.use('/api/scholarships', authscholarship);
app.use('/api/users', userRoutes); // Use the user routes for API calls
app.use('/api/admin', adminRoutes); // Use the admin routes for API calls

app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page (since we used --no-view, this will just send JSON)
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

module.exports = app;

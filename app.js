var express = require('express');
var app = express();
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bluebird = require('bluebird');


var listener = app.listen(8888, function(){
  console.log('Listening on port ' + listener.address().port); //Listening on port 8888
});

/** Mongo Connection */
var mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://127.0.0.1:27017/textpal')
.then(()=> { console.log(`Succesfully Connected to the
Mongodb Database  at URL : mongodb://127.0.0.1:27017/textpal`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb 
Database at URL : mongodb://127.0.0.1:27017/textpal`)});
var db = mongoose.connection;

// use session for tracking logins
app.use(session({
  secret: 'supersecret17!',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}))

// parse incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/** ROUTES */
var api = require('./routes/api.route')
/** USE ROUTES */
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.send({
    message: err.message,
    error: err
  });
  return;
});

/** CORS */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

module.exports = app;
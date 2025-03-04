const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const routs = require('./routes/routs');
const connectDB = require("./database/connection");
const createAdmin = require("./utils/intiolization");

const app = express();

// connect to MongoDB:
connectDB();
createAdmin()

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    key: "user_sid",
    secret: process.env.SESSION,
    resave: false, // Don't save the session if it wasn't modified
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 30 * 60 * 1000
    }
  })
);

app.use((req, res, next) => {
  if (!req.cookies.user_sid || !req.session.user) {
    res.clearCookie('user_sid')
  };
  next()
})


app.use('/' ,routs);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

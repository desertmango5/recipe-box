const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const routes = require('./routes/index');
const helpers = require('./helpers');
const errorHandlers = require('./handlers/errorHandlers');

// create Express app
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// makes raw data usable on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// populates req.cookies with any cookies that come along with the request
app.use(cookieParser());

// exposes several methods for validating data
app.use(expressValidator());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
}));

// flash middleware that uses req.flash to send messages to user on next page user requests
app.use(flash());

// pass variables to templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers;
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// handle routes
app.use('/', routes);

// if above routes don't work, 404 user and forward to error handler
app.use(errorHandlers.notFound);

app.use(errorHandlers.flashValidationErrors);

// development error display
if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

// export to start.js
module.exports = app;


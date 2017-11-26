const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const path = require('path');
const routes = require('./routes/index');

// create Express app
const app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));


module.exports = app;

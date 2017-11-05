const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const config = require('./config');

const routes = require('./routes');

const app = express();

mongoose.Promise = global.Promise;

// Parse incoming request bodies and attach under the req.body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Compress response bodies.
app.use(compress());

// Secure app with HTTP headers.
app.use(helmet());

// Logger.
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', routes);

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
var cors = require('cors');
const httpErrorHandler = require("http-errors-express").default;

require('dotenv').config()



const db = require('./createDBconnection');

var authRouter = require('./routes/Auth');
var pricesRouter = require('./routes/Prices');
var reservationsRouter = require('./routes/Reservations');


var app = express();

app.use(cors());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', authRouter);
app.use('/prices', pricesRouter);
app.use('/reservations', reservationsRouter);

const isProd = app.get("env") === "production";

app.use(
    httpErrorHandler({
      formatError: (err, _req, _isExposed) => {
        return !isProd
            ? {
              status: err.statusCode,
              name: err.name,
              message: err.message,
              stack: err.stack,
            }
            : {
              status: err.statusCode,
              name: err.name,
              message: err.message,
            };
      },
    })
);

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

var port = process.env.PORT || 3000;

app.set('port', port);

var server = http.createServer(app);
server.listen(port);


module.exports = app

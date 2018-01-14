const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const logger        = require('morgan');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');
const cors          = require('cors')
// ======================================================
const index       = require('./routes/index');
const signin      = require('./routes/signin');
const signup      = require('./routes/signup');
const questions   = require('./routes/questions');
const answers   = require('./routes/answers');
// ======================================================
const app = express();
require('dotenv').config()
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// ======================================================
const db            = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/overflow')
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we\'re connected to database!')
});
// ======================================================
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
// ======================================================

app.use('/', index);
app.use('/api/signin', signin);
app.use('/api/signup', signup);
app.use('/api/questions', questions);
app.use('/api/answers', answers);
// ======================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  console.log(err)
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('./config/mongoose');

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

var db = mongoose();
var auth = require('./middlewares/auth');
var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin/admin');
var rooter = require('./routes/superuser/superuser');
var teacher = require('./routes/teacher/teacher');
var student = require('./routes/student/student');



var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: '123456',
    name: 'examOnlie',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 365 * 24 * 60 * 60 * 1000},  //设置maxAge是ms，session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));

app.use(function(req, res, next){
    res.locals.session = req.session;
    next();
});

//express总路由
app.use('/', index);
app.use('/rooter',auth.adminRequired,rooter);
app.use('/admin',auth.schadminRequired,admin);
app.use('/student',auth.studentRequired,student);
app.use('/teacher',auth.teacherRequired,teacher);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // var err = new Error('Not Found');
  // err.status = 404;
  // next(err);
    res.render('404', {
        title: 'No Found'
    })
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

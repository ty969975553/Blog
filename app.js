var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var session = require('express-session');
const flash = require('connect-flash')
// const MongoStore = require('connect-mongo')(session)

var index = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var blog = require('./routes/blog');
var tag = require('./routes/tag');
var article = require('./routes/article');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//设置模板的后缀是html
app.engine('html', require('ejs').renderFile);
//指定总模板
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    name: "myblog", // 设置 cookie 中保存 session id 的字段名称
    secret: "myblog", // 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
    resave: true, // 强制更新 session
    saveUninitialized: false, // 设置为 false，强制创建一个 session，即使用户未登录
    cookie: {
        maxAge: 1000 * 60 * 10// 过期时间，过期后 cookie 中的 session id 自动删除
    }
    // store: new express.session.Memor
    }));
// flash 中间件，用来显示通知
app.use(flash())

app.use(['/article', '/tag'], function(req, res, next)
{
    if (req.session.user) {
        res.locals.user = req.session.user;
        next();//如果请求的地址是登录则通过，进行下一个请求
    } else {
        req.flash('error', '请登录')
        res.redirect('/admin');
    }
});

app.use('/', index);
app.use('/', blog);
app.use('/users', users);
app.use('/admin', admin);
app.use('/tag', tag);
app.use('/article', article);


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
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.set('jsonp callback name', 'cb');

app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 挂载 cookie 中间件
app.use(cookieParser());

app.use('/', require('./home'));
app.use('/session', require('./session'));
app.use('/download', require('./download'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    let err = new Error(`${req.originalUrl} Not Found`);
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

let server = app.listen(5002, 'localhost', function(){
    const { address, port } = server.address();
    console.log('应用实例地址为：http://%s:%s', address, port);
});

process.stdin.resume();
process.on('SIGHUP', function () {
    console.log('Reloading configuration....');
});

module.exports = app;











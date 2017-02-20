var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    r = require('./db/db'),
    bodyParser = require('body-parser');




// view engine setup

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var index = require('./routes/index'),
    users = require('./routes/users')(io);



require('./bin/authenticate')(app,{
    authentication:true,
    expiration:{
      status:true,
      time:100000
    },
    fixedToken:false,
    withoutToken:['/logs/','/users/usersAuth'],
    stateRedirect:[],
    callbackAuth:function (auth,token) {
        r.table('users')
            .filter(r.row('token').eq(token))
            .coerceTo('array')
            .run(r.conn)
            .then((result) => {
                if (result.length > 0) {
                    auth(result[0]);
                }else{
                    auth();
                }
            })
    }

});





app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/logs',express.static(path.join(__dirname, 'node_modules/console-serv-brow')));
require('console-serv-brow')(app,{
    pathRoute:'/logs' ,
    log:console
});


app.use('/', index);
app.use('/users', users);

io.on('connection', function(socket){
  socket.emit('responseSocket',{lastName:'Zelada'})
});

app.use(function(req, res, next){
  res.io = io;
  next();
});

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

module.exports = {app: app, server: server};
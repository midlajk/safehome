require('./model/db');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const multer = require('multer');
const session = require('express-session');
// view engine setu
const MongoDBStore = require('connect-mongodb-session')(session);// Import connect-mongo to use it as a session store

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postrequest = require('./routes/postrequest');
var getrequest = require('./routes/getrequest');
var frontendapi = require('./routes/frontend/frontendget');

/////front end //
var frontendrequest = require('./routes/frontend/index');

var cors = require('cors')
const corsOptions ={
  origin:'https://www.safehomes.ae', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

var app = express();
const url = `mongodb://safehomes%40gmail.com:safehomes123%23@127.0.0.1:27017/safehome`;
const store = new MongoDBStore({
  uri: url,
  collection: 'sessions',
  

});
// Configure session and session store with connect-mongo
app.use(
  session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store,
  

  })
);
// view engine setup
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(cors({ origin: 'https://safehomes.ae' }));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/content', express.static(path.join(__dirname, 'content')));
;
const storage = multer.diskStorage({
  destination:"content",
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
app.use(multer({ storage: storage }).any());

app.use('/backend/', indexRouter);
app.use('/backend/', postrequest);
app.use('/backend/', getrequest);
app.use('/users', usersRouter);
/////Front end routes ///
app.use('/', frontendrequest);
app.use('/', frontendapi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'https://safehomes.ae');
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log('error:',err)
  res.render('errorpage', { error: err });
});

module.exports = app;

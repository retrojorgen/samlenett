    var   express       = require('express')
    , session           = require('express-session')
    , cookieParser      = require('cookie-parser')
    , bodyParser        = require('body-parser')
    , passport          = require('passport')
    , flash             = require('connect-flash')
    , logger            = require('morgan')
    , MongoStore        = require('connect-mongo')(session) 
    , port              = process.env.PORT || 3000
    , app               = express();


// configuration ===============================================================
// connect to our database

require('./config/passport')(passport); // pass passport for configuration
var dbQueries = require('./config/dbQueries.js'); // pass passport for configuration
var importers = require('./config/importers.js')(dbQueries); // pass passport for configuration



app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


// required for passport
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
app.use(session({
  secret: 'vidyapathaisalwaysrunning',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    maxAge: new Date().getTime() + (10 * 365 * 24 * 60 * 60)
  },
  store: new MongoStore({ url: 'mongodb://localhost/spilldb' })
 } )); // session secret

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session




app.use(express.static(__dirname + '/static'));



require('./app/routes.js')(app, passport, dbQueries, importers);


app.listen(port, function () {
  console.log('Listening on http://localhost:' + (process.env.PORT || 3000))
});

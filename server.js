var express        = require('express');
var exphbs         = require('express-handlebars')
var passport       = require('passport');
var session        = require('express-session');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var geocoder = require('geocoder');

var app = express();
var port = process.env.PORT || 3100;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static("public"));

app.set('views', './views')
app.engine('hbs', exphbs({
    defaultLayout: "main",
    extname: '.hbs'
}));

app.set('view engine', '.hbs');

var db = require('./models');
require('./config/passport/passport.js')(passport, db.User);

var mainRoute = require('./routes/main-route.js')(app,passport);

db.sequelize.sync({ force: false }).then(function() {
    app.listen(port, function() {
        console.log("App listening on PORT " + port);
    });
});
// Entry point for the application
const express = require('express');
const app = express();

// Security reasons (blocks header from containing info about server)
app.disable('x-powered-by');

// Set up Handlebars
const handlebars = require('express-handlebars').create({defaultLayout: 'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// MORE IMPORTS HERE
app.use(require('body-parser').urlencoded({extended: true}));

const formidable = require('formidable');

const credentials = require('./credentials.js');
app.use(require('cookie-parser')(credentials.cookieSecret));

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));

///////////////// R O U T E S ///////////////////////////
app.get('/', function(req, res) {
  res.render('home');
});
// req = HTTP request
// res = response object that sends back after request

app.use(function(req, res, next){
  console.log("Looking for URL : " + req.url);
  next();
});

//Looking for URL that doesn't exist
app.get('/junk', function(req, res, next){
  console.log("Tried to access /junk");
  throw new Error('/junk doesn\'t exist');
});

app.use(function(err, req, res, next){
  console.log("Error : " + err.message);
  next();
});

app.get('/about', function(req, res) {
  res.render('about');
});

app.use(function(req, res){
  res.type('text/html');
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.get('/contact', function(req, res){
  res.render('contact')
})

app.listen(app.get('port'), function(){
  console.log("Express started on http://localhost:" + app.get('port') + ' press Ctrl-C to terminate.');
});


/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();
var mongoose = require('mongoose'); 					// mongoose for mongodb

// configuration =================

mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'); 	// connect to mongoDB database on modulus.io

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev')); 						// log every request to the console
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride()); 						// simulate DELETE and PUT
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// ----------  app.use(express.static(__dirname + '/public')); 		// set the static files location /public/img will be /img for users
app.use(express.bodyParser()); 							// pull information from html in POST

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);



app.get('/', function(request, response, next){
    //
    // response.send("here is a bunch of text")
    response.render("index", {title: "My lovely app"})
});


app.get("/api", function(req, res, next){
    res.send({name:"Graham", thing:"Hello world"})
})



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

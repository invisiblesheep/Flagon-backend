
//Dependencies
var http = require('http');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

//MongoDB
mongoose.createConnection('mongodb://localhost/restmongo');
mongoose.createConnection('mongodb://localhost/datastorage');

//Express
var app = express();
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Routes
app.use('/api', require('./routes/api'));
app.get('/', function (req, res) {
    res.send('<html><body><h1>Flagon</h1></body></html>');
});
app.use(function (req, res) {
    res.render('404', {url:req.url});
});


// Start server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
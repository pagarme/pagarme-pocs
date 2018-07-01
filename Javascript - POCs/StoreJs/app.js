var app = require('./config/server')
var routes = require('./routes')
var express = require('express')
var cookieParser = require('cookie-parser');
app.listen(8090, function() {
    console.log('localhost:8090');
});

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());
app.use(express.static(__dirname + '/src/styles'));
app.use(express.static(__dirname + '/public'));
app.use('/',routes)

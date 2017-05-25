var express = require('express')
var app = express()
var bp = require('body-parser')
var mongoose = require('mongoose')

app.use(express.static(__dirname + '/client'))
app.use(express.static(__dirname + '/bower_components'))
app.use(bp.json())

var models_setter = require('./server/config/mongoose.js')
var routes_setter = require('./server/config/routes.js')
routes_setter(app)

app.listen(8000, function(){
	console.log('Listening at port 8000')
})
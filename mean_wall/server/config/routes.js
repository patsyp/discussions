var mongoose = require('mongoose')
var User = mongoose.model('User')
var users = require('../controllers/users')
var Message = mongoose.model('Message')
var messages = require('../controllers/messages')
var Comment = mongoose.model('Comment')
var comments = require('../controllers/comments')

module.exports = function(app){
	app.get('/users', function(req, res) {
	  users.index(req, res);
	});
	app.get('/users/:id', function(req, res) {
	  users.show(req, res);
	});
	app.post('/users', function(req, res) {
	  users.create(req, res);
	});
	app.put('/users/:id', function(req, res) {
	  users.update(req, res);
	});
	app.delete('/users/:id', function(req, res) {
	  users.destroy(req, res);
	});
	app.post('/sessions', function(req, res){
		users.login(req, res)
	})

	app.get('/messages', messages.index)
	app.post('/messages', messages.create)
	app.get('/messages', messages.show)
	app.delete('/messages/:id', messages.destroy)
	app.put('/messages/:id/likes', messages.updateLikes)

	app.get('/comments', comments.index)
	app.post('/comments', comments.create)
	app.get('/comments/:id', comments.show)
	app.delete('/comments/:id', comments.destroy)
}
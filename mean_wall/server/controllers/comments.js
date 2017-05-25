var mongoose = require('mongoose')
var Message = mongoose.model('Message')
var User = mongoose.model('User')
var Comment = mongoose.model('Comment')

module.exports = {
	index: function (req, res){
		Comment.find({}, function(err, comments){
			if (err){
				return res.json(err)
			}
			return res.json(comments)
		})
	},
	create: function(req, res){
		Comment.create(req.body, function(err, comment){
			if(err){
				return res.json(err)
			}
			// Message.findById(req.body.message, function(err, message){
			// 	if (err){
			// 		return res.json(err)
			// 	}
			// 	message.comments.push(comment._id)
			// 	message.save(function(err, message){
			// 		if (err){
			// 			return res.json(err)
			// 		}
			// 		User.findById(req.body.user, function(err, user){
			// 			if (err){
			// 				return res.json(err)
			// 			}
			// 			user.comments.push(comment._id)
			// 			user.save(function(err, user){
			// 				if (err){
			// 					return res.json(err)
			// 				}
			// 				return res.json(comment)
			// 			})
			// 		})
			// 	})
			// })
			Message.findByIdAndUpdate(req.body.message, {$push: {comments:comment._id}}, function(err, message){
				if (err){
					return res.json(err)
				}
				User.findByIdAndUpdate(req.body.user, {$push: {comments:comment._id}}, function(err, user){
					if (err){
						return res.json(err)
					}
					return res.json(comment)
				})
			})
		})
	},
	show: function(req, res){
		Comment.findById(req.params.id, function(err, comment){
			if (err){
				return res.json(err)
			}
			return res.json(comment)
		})
	},
	destroy: function(req, res){
		Comment.findByIdAndRemove(req.params.id, function(err, comment){
			if (err){
				return res.json(err)
			}
			return res.json(comment)
		})
	}
}
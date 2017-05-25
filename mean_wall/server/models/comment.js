var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	message: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	},
	comment: {
		type: String,
		required: [true, 'Comment cannot be blank']
	}
}, {timestamps: true})

mongoose.model('Comment', CommentSchema) 
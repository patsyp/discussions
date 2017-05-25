var mongoose = require('mongoose')
var bcrypt = require('bcryptjs')

var Message = mongoose.model('Message')
var Comment = mongoose.model('Comment')

var UserSchema = new mongoose.Schema({
	username: {type: String, required: [true, 'Username field cannot be blank.']},
	messages: [{type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'}],
	comments: [{type: mongoose.Schema.Types.ObjectId,
		ref: 'Comment'}]
}, {timestamps: true})

// UserSchema.methods.hashPassword = function(password){
// 	this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// }
// UserSchema.methods.authenticate = function(password){
// 	return bcrypt.compareSynch(password, this.password)
// }

// UserSchema.pre('save', function(callback){
// 	this.hashPassword(this.password)
// 	callback()
// })

UserSchema.pre('remove', function(callback){
	var self = this
	Message.remove({user: self._id}, function(){
		callback()
	}).then(function(){
		Comment.remove({user: self._id}, function(){
			callback()
		})
	})
})
mongoose.model('User', UserSchema)

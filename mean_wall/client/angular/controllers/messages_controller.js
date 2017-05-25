app.controller('MessagesController', function(UserFactory, MessageFactory, $location, CommentFactory){
	console.log('MessagesController connected!')
	var self = this
	self.messages = {};
	self.new_message_errors = []
	self.newMessage = {}
	self.newComment = {}
	self.comment_errors =[]

	self.create = function(newMessage){
		UserFactory.session(function(user){
			newMessage.user = user._id
			MessageFactory.create(newMessage, function(res){
			if (res.data.errors){
				for(key in res.data.errors){
					var error = res.data.errors[key]
					self.new_message_errors.push(error.message)
				}
			} else {
				self.index()
				self.newMessage = {}
			}
			})
		})
	}
	self.index = function(){
		MessageFactory.index(function(res){
			self.messages = res.data
		})
	}
	self.destroy = function(id){
		MessageFactory.destroy(id, self.index)
	}
	self.createComment = function(newComment, index, message_id){
		self.comment_errors = {}
		if(!newComment[index]){
			newComment[index] = {}
		}
		newComment = newComment[index]
		newComment.message = message_id
		UserFactory.session(function(user){
			newComment.user = user
			CommentFactory.create(newComment, function(res){
				self.newComment = {}
				if (res.data.errors){
					self.comment_errors[index] = []
					for (key in res.data.errors){
						var error = res.data.errors[key]
						self.comment_errors[index].push(error.message)
					}
				} else {
					self.index()
				}
				
			})
		})
		
	}
	self.destroyComment = function(id){
		CommentFactory.destroy(id, self.index)
	}
	self.updateLikes = function(message_id, user_id){
		MessageFactory.updateLikes(message_id, user_id,  self.index)
	}
})
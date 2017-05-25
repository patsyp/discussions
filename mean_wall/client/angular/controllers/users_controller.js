app.controller('UsersController', function(UserFactory, $cookies, $location){
	console.log('UsersController connected!')
	var self = this
	self.users = []
	self.reg_errors = []
	self.log_errors =[]
	self.user = {}

	self.index = function(){
		UserFactory.index(function(res){
			self.users = res.data
		})
	}

	self.session = function(){
		UserFactory.session(function(user){
			console.log('user:', user)
			if (user){
				self.current_user = user
			} else {
				$location.url('/')
			}
		})
	}
	self.logout = function(){
		$cookies.remove('user_id')
		$location.url('/')
	}

	self.login = function(loginUser){
		UserFactory.login(loginUser, function(res){
			self.log_errors = []
			if (res.data.errors){
				for (key in res.data.errors){
					var error = res.data.errors[key]
					self.log_errors.push(error.message)
				}
			} else {
				$cookies.put('user_id', res.data._id)
				$location.url('/dashboard')
			}
		})
	}

	self.create = function(newuser){
		UserFactory.create(newuser, function(res){
			self.reg_errors =[]
			if (res.data.errors){
				for(key in res.data.errors){
				var error = res.data.errors[key]
				self.reg_errors.push(error.message)
				}
			} else {
				$cookies.put('user_id', res.data._id)
				$location.url('/dashboard')
			}
		})
	}

	// self.show = function(){
	// 	FriendFactory.show($routeParams.id, function(res){
	// 		self.user = res.data
	// 	})
	// }

})
app.factory('UserFactory', function($http, $cookies){
	var factory = {}

	factory.index = function(callback){
		$http.get('/users').then(callback)
	}
	factory.create = function(newuser, callback){
		$http.post('/users', newuser).then(callback)
	}
	factory.session = function(callback){
		var user_id = $cookies.get('user_id')
		if(!user_id){
			return callback(false)
		}
		$http.get('/users/' + user_id).then(function(res){
			if (res.data.errors){
				return callback(false)
			}
			return callback(res.data)
		})
	}
	factory.login = function(loginuser, callback){
		$http.post('/sessions', loginuser).then(callback)
	}
	factory.show = function(id, callback){
		console.log(id)
		$http.get('/users/' + id).then(callback)
	}
	return factory
})
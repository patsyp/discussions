var mongoose = require('mongoose')
var User = mongoose.model('User')

module.exports = {
  index: function(req,res){
    User.find({}).exec(function(err, users){
    	if (err){
    		return res.json(err);
    	}
    	return res.json(users)
    })
  },
  create: function(req,res){
    User.findOne({username: req.body.username}, function(err, user){
      if(err){
        return res.json(err)
      }
      if (user){
        return res.json (user)
      }
      if (!user){
        var user = new User(req.body)
        User.create(req.body, function(err, user){
          if(err){
            return res.json(err)
          }
          return res.json(user)
        })
      }
    })
  },
  update: function(req,res){
   User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}, function(err, user){
   	 console.log(user)
   	 if(err){
   	 	return res.json(err)
   	 }
   	 if (!user){
   	 	return res.json({errors: '404 - user not found'})
   	 }
   	 return res.json(user)
   })
  },
  destroy: function(req,res){
    User.findById(req.params.id, function(err, user){
    	if (err){
    		return res.json(err)
    	}
      user.remove(function(err, user){
        if(err){
          return res.json(err)
        }
   	 	return res.json(user)
      }) 
    })
  },
  show: function(req,res){
    User.findById(req.params.id, function(err, user){
    	if(err){
    		return res.json(err)
    	}
    	if (!user){
    		return res.json({errors: '404 - user not found'})
    	}
    	return res.json(user)
    })
  },
  login: function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
      if(err){
        return res.json(err)
      }
      if (!user){
        return res.json({errors: '404 - User not found.'})
      }
      return res.json(user)
    })
  }
}
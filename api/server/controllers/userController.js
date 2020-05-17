// Import user model
User = require("../models/userModel");

// Handle index actions
exports.index = function (req, res) {
  User.get(function (err, users) {
    if (err) {
      res.json({
        status: "error",
        message: err,
      });
    }
    res.json({
      status: "success",
      message: "user retrieved successfully",
      data: users,
    });
  });
};

// Receives details about the new user and creates a new user
// on the DataBase
// Returns an error msg
exports.register = function (req, res) {
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.password = req.body.password;
  user.displayName = req.body.displayName;
  user.stuff = req.body.stuff
  user.save(function(err){
    if(err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,        
      });
    }
    res.json({
    status: res.statusCode,
    data: user,
    message: "User created successfully"
    });
  });
};

// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) { 
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      })
    }
    res.json({
      status: res.statusCode,
      message: "User retreived!",
      data: user,
    });
  });
};

// Handle update user info
exports.update = function (req, res) {
  User.findById(req.params.user_id, function (err, user) {
    if (err) res.send(err);
    user.name = req.body.name ? req.body.name : user.name;
    user.email = req.body.email;
    user.phone = req.body.phone;
    user.password = req.body.password;
    // save the user and check for errors
    user.save(function (err) {
      if (err) res.json(err);
      res.json({
        message: "user Info updated",
        data: user,
      });
    });
  });
};

// Handle delete user
exports.delete = function (req, res) {
  User.deleteOne(
    {
      _id: req.params.user_id,
    },
    function (err, user) {
      if (err) res.send(err);
      res.json({
        status: "success",
        message: "user deleted",
      });
    }
  );
};


// Get groups associated to a particular user
exports.userGroups = function(req, res) {
  User.findById(req.params.user_id, {stuff: 1}, function(err, data) {
    if (err) { 
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      });
    }
    res.json({
      message: "user's group details",
      data: data
    });
  });
}

// Receieves a string as input
// Returns the id, username, email of the user
exports.usersByUsername = function(req, res) {
  const reg = "^" + req.params.username;
  console.log(reg)
  User.find({email: {$regex: reg, $options: "<i>"}, }, {email: 1, username: 1}, function(err, results){
    if (err) { 
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      })
    }
    res.json({
      status: res.statusCode,
      message: "Users with this email",
      data: results
    })
  })
}

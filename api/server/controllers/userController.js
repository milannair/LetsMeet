// Import user model
User = require("../models/userModel");

// Receives details about the new user and creates a new user
// on the DataBase
// Returns an error msg
exports.register = function (req, res) {
  var user = new User();
  user.username = req.body.username.toLowerCase();
  user.email = req.body.email;
  user.phone = req.body.phone;
  user.password = req.body.password;
  user.displayName = req.body.displayName;
  user.save(function(err){
    if(err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,        
      });
    } else {
      res.json({
        status: res.statusCode,
        data: user,
        message: "User created successfully"
      });
    }
  });
};

// Handle view user info
exports.view = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
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

// Get user's name, username, and email
exports.getUserIdentifiers = function(req, res) {
  User.find({_id: req.params.userId}, {displayName: 1, username: 1, email: 1}, function (err, data) {
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
      data: data,
    });
  });
}

// Handle update user info
exports.update = function (req, res) {
  User.findById(req.params.userId, function (err, user) {
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
      _id: req.params.userId,
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name
        });
      } else {
        res.json({
          status: res.statusCode,
          message: "user deleted",
          data: data,
        });
      }
    }
  );
};


// Get groups associated to a particular user
exports.userGroups = function(req, res) {
  User.findById(req.params.userId, {groups: 1}, function(err, data) {
    if (err) { 
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      });
    }
    res.json({
      status: 200,
      message: "user's group details",
      data: data.groups
    });
  });
}

// Receieves a string as input
// Returns the user's id, username, and email
exports.usersByUsername = function(req, res) {
  const reg = "^" + req.params.username;
  User.find({username: {$regex: reg, $options: "<i>"}, }, {email: 1, username: 1}, function(err, data){
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
      data: data
    })
  })
}

// Receives userId and a groupId as input
// Adds the groupId to the user's groups requests
exports.addGroupRequest = function(req, res) {
  User.update(
    {_id: req.body.userId},
    {
      $push: { requests: req.body.groupId}
    },
  function(err, data) {
    if(err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      })
    } else {
      res.json({
        status: res.statusCode,
        message: "Request successfully added to the user",
        data: data
      })
    }
  })
}

// Receives a groupId and a userId
// Removes the groupId from the user's group requests
exports.removeGroupRequest = function(req, res) {
  User.update(
    {_id: req.body.userId},
    {
      $pull: { requests: req.body.groupId}
    },
  function(err, data) {
    if(err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      })
    } else {
      res.json({
        status: res.statusCode,
        message: "Request successfully added to the user",
        data: data
      })
    }
  })
}

// Receives userId and a groupId as input
// Adds the groupId to the user's groups
exports.addGroup = function(req, res) {
  User.update(
    {_id: req.body.userId},
    {
      $push: { groups: req.body.groupId}
    },
  function(err, data) {
    if(err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      })
    } else {
      res.json({
        status: res.statusCode,
        message: "Group successfully added to the user",
        data: data
      })
    }
  })
}


// Receives userId and a groupId as input
// Removes the groupId from the user's groups
exports.removeGroup = function(req, res) {
  User.update(
    {_id: req.body.userId},
    {
      $pull: { groups: req.body.groupId}
    },
  function(err, data) {
    if(err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      })
    } else {
      res.json({
        status: res.statusCode,
        message: "Group successfully added to the user",
        data: data
      })
    }
  })
}

// Gets meetings for a particular user
exports.userMeetings = function(req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      });
    } else if (user) {
      res.json({
        status: 200,
        message: "User's meetings",
        data: user.meetings,
      });
    } else {
      res.json({
        status: 404,
        message: "User not exist",
      });
    }
  });
}

// Receives an userId and a meetingId as input
// Adds the meetingId to the user's meetings list
exports.addMeeting = function(req, res) {
  User.update(
    {_id: req.body.userId},
    {
      $push: {meetings: req.body.meetingId}
    },
    function(err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          message: "Meeting successfully added to the user",
          data: data,
        });
      }
    }
  );
}

// Receives an userId and a meetingId as input
// Removes the meetingId from the user's meetings list
exports.removeMeeting = function(req, res) {
  User.update(
    {_id: req.body.userId},
    {
      $pull: {meetings: req.body.meetingId}
    },
    function(err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          message: "Meeting successfully deleted from the user",
          data: data,
        });
      }
    }
  );
}

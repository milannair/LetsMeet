// Import user model
User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

<<<<<<< HEAD
module.exports = {
  register: async (req, res) => {
    const user = await User.findOne({ username: req.body.cred });
    const checkPhone = await User.findOne({ phone: req.body.phone });
    const checkEmail = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("Username is taken. Choose another username");
    if (checkPhone)
      return res
        .status(400)
        .send("Looks like that phone number is registered to another account");
    if (checkEmail)
      return res
        .status(400)
        .send("Looks like that email is registered to another account");
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    const newUser = await User.create(req.body).catch((err) =>
=======
var socket = require('../../server');

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
>>>>>>> d76392c6702fa4339e10a52aee720ec9bbfd5294
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(newUser);
  },

  login: async (req, res) => {
    const usernameCheck = await User.findOne({ username: req.body.cred });
    const emailCheck = await User.findOne({ email: req.body.cred });
    if (!usernameCheck && !emailCheck)
      return res.status(400).send("Invalid email/username or password");
    const user = !usernameCheck ? emailCheck : usernameCheck;
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass)
      return res.status(400).send("Invalid email/username or password");
    const token = jwt.sign({ _id: user._id }, process.env.privateKey);
    res.status(200).header("x-auth-token", token).send(true);
  },

  view: async (req, res) => {
    const singleUser = await User.findById(req.params.userId).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(singleUser);
  },

<<<<<<< HEAD
  delete: async (req, res) => {
    const deleteUser = await User.findByIdAndDelete(req.params.userId).catch(
      (err) =>
=======
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
>>>>>>> d76392c6702fa4339e10a52aee720ec9bbfd5294
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        })
    );
    res.status(200).json(deleteUser);
  },

  update: async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(
      req.params.userId,
      req.body,
      {
        runValidators: true,
      }
    ).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(updateUser);
  },

  userGroups: async (req, res) => {
    const userGroup = await User.findById(req.params.userId, {
      groups: 1,
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(userGroup);
  },

  usersByUsername: async (req, res) => {
    const reg = "^" + req.params.username;
    const toFind = User.find(
      { username: { $regex: reg, $options: "<i>" } },
      { email: 1, username: 1 }
    ).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(toFind);
  },

  addGroupRequest: async (req, res) => {
    const addReq = User.findByIdAndUpdate(req.params.userId, {
      $push: { requests: req.params.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
<<<<<<< HEAD
    );
    res.status(200).json(addReq);
  },
=======
      socket.io.to(socket.clients[req.body.userId]).emit('add group request');
    }
  })
}
>>>>>>> d76392c6702fa4339e10a52aee720ec9bbfd5294

  removeGroupRequest: async (req, res) => {
    const removeReq = User.findByIdAndUpdate(req.params.userId, {
      $pull: { requests: req.params.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(removeReq);
  },

  addGroup: async (req, res) => {
    const addGroup = User.findByIdAndUpdate(req.params.userId, {
      $push: { groups: req.params.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
<<<<<<< HEAD
    );
    res.status(200).json(addGroup);
  },
=======
      socket.io.to(socket.clients[req.body.userId]).emit('remove group request');
    }
  })
}
>>>>>>> d76392c6702fa4339e10a52aee720ec9bbfd5294

  removeGroup: async (req, res) => {
    const removeGroup = User.findByIdAndUpdate(req.params.userId, {
      $pull: { groups: req.params.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(removeGroup);
  },

  /*
   * Gets meetings for a particular user.
   *
   * Required query parameters:
   *  userId: ObjectId - the ID of the user
   *
   * Returns:
   *  500 if an internal server error occurs
   *  404 if the user does not exist
   *  The array of the user's meetings for the user if the operation was
   *    successful
   */
  userMeetings: async (req, res) => {
    const user = await User.findById(req.params.userId).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user.meetings);
  },

  /*
   * Adds a meeting to a particular user.
   *
   * Required query parameters:
   *  userId: ObjectId - the ID of the user
   *  meetingId: ObjectId - the ID of the meeting
   *
   * Returns:
   *  500 if an internal server error occurs
   *  Information about the user if the operation was successful
   */
  addMeeting: async (req, res) => {
    const user = User.findByIdAndUpdate(req.params.userId, {
      $push: { meetings: req.params.meetingId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(user);
  },

  /*
   * Removes a meeting from a particular user.
   *
   * Required query parameters:
   *  userId: ObjectId - the ID of the user
   *  meetingId: ObjectId - the ID of the meeting
   *
   * Returns:
   *  500 if an internal server error occurs
   *  Information about the user if the operation was successful
   */
  removeMeeting: async (req, res) => {
    const user = User.findByIdAndUpdate(req.params.userId, {
      $pull: { meetings: req.params.meetingId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
<<<<<<< HEAD
      })
    );
    res.status(200).json(user);
  },
};
=======
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

// Receives userId as input
// Sends the user's schedule
exports.viewSchedule = function(req, res) {
  User.findById(req.params.userId, {schedule: 1}, function(err, data) {
    if(err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      });
    } else {
      res.json({
        status: res.statusCode,
        message: "Successfully retrieved user schedule",
        data: data
      });
    }
  });
}

// Receives userId and schedule as input
// Sets the schedule for the user to the given schedule
exports.setSchedule = function(req, res) {
  User.updateOne(
    { _id: req.body.userId },
    {
      $set: { schedule: req.body.schedule }
    },
  function(err, data) {
    if(err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name
      });
    } else {
      res.json({
        status: res.statusCode,
        message: "Successfully updated user schedule",
        data: data
      });
    }
  });
}
>>>>>>> d76392c6702fa4339e10a52aee720ec9bbfd5294

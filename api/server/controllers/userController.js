// Import user model
User = require("../models/userModel");

var socket = require("../../server");

// Receives details about the new user and creates a new user
// on the DataBase
// Returns an error msg
exports.register = async function (req, res) {
  const user = await User.findOne({ username: req.body.cred });
  const checkPhone = await User.findOne({ phone: req.body.phone });
  const checkEmail = await User.findOne({ email: req.body.email });
  if (user)
    return res
      .status(400)
      .json({ message: "Username is taken. Choose another username" });
  if (checkPhone)
    return res.status(400).json({
      message: "Looks like that phone number is registered to another account",
    });
  if (checkEmail)
    return res
      .status(400)
      .json({
        message: "Looks like that email is registered to another account",
      });
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);
  const newUser = await User.create(req.body).catch((err) =>
    res.json({
      status: 500,
      errorMessage: err.message,
      errorName: err.name,
    })
  );
  res.status(200).json(newUser);
};

exports.login = async function (req, res) {
  const usernameCheck = await User.findOne({ username: req.body.cred });
  const emailCheck = await User.findOne({ email: req.body.cred });
  if (!usernameCheck && !emailCheck)
    return res
      .status(400)
      .json({ message: "Invalid email/username or password" });
  const user = !usernameCheck ? emailCheck : usernameCheck;
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res
      .status(400)
      .json({ message: "Invalid email/username or password" });
  const token = jwt.sign({ _id: user._id }, process.env.privateKey);
  res
    .status(200)
    .header("x-auth-token", token)
    .header("userId", user._id)
    .send(true);
};

// Handle view user info
exports.view = async function (req, res) {
  User.findById(req.params.userId, function (err, user) {
    if (err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      });
    }
    res.json({
      status: res.statusCode,
      message: "User retreived!",
      data: user,
    });
  });
};

// Get user's name, username, and email
exports.getUserIdentifiers = async function (req, res) {
  User.find(
    { _id: req.params.userId },
    { displayName: 1, username: 1, email: 1 },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      }
      res.json({
        status: res.statusCode,
        message: "User retreived!",
        data: data,
      });
    }
  );
};

// Handle update user info
exports.update = async function (req, res) {
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
exports.delete = async function (req, res) {
  User.deleteOne(
    {
      _id: req.params.userId,
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
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
exports.userGroups = async function (req, res) {
  User.findById(req.params.userId, { groups: 1 }, function (err, data) {
    if (err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      });
    }
    res.json({
      status: 200,
      message: "user's group details",
      data: data.groups,
    });
  });
};

// Receieves a string as input
// Returns the user's id, username, and email
exports.usersByUsername = async function (req, res) {
  const reg = "^" + req.params.username;
  User.find(
    { username: { $regex: reg, $options: "<i>" } },
    { email: 1, username: 1 },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      }
      res.json({
        status: res.statusCode,
        message: "Users with this email",
        data: data,
      });
    }
  );
};

// Receives userId and a groupId as input
// Adds the groupId to the user's groups requests
exports.addGroupRequest = async function (req, res) {
  User.update(
    { _id: req.body.userId },
    {
      $push: { requests: req.body.groupId },
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          message: "Request successfully added to the user",
          data: data,
        });
        socket.io.to(socket.clients[req.body.userId]).emit("add group request");
      }
    }
  );
};

// Receives a groupId and a userId
// Removes the groupId from the user's group requests
exports.removeGroupRequest = async function (req, res) {
  User.update(
    { _id: req.body.userId },
    {
      $pull: { requests: req.body.groupId },
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          message: "Request successfully added to the user",
          data: data,
        });
        socket.io
          .to(socket.clients[req.body.userId])
          .emit("remove group request");
      }
    }
  );
};

// Receives userId and a groupId as input
// Adds the groupId to the user's groups
exports.addGroup = async function (req, res) {
  User.update(
    { _id: req.body.userId },
    {
      $push: { groups: req.body.groupId },
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          message: "Group successfully added to the user",
          data: data,
        });
      }
    }
  );
};

// Receives userId and a groupId as input
// Removes the groupId from the user's groups
exports.removeGroup = async function (req, res) {
  User.update(
    { _id: req.body.userId },
    {
      $pull: { groups: req.body.groupId },
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          message: "Group successfully added to the user",
          data: data,
        });
      }
    }
  );
};

// Gets meetings for a particular user
exports.userMeetings = async function (req, res) {
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
};

// Receives an userId and a meetingId as input
// Adds the meetingId to the user's meetings list
exports.addMeeting = async function (req, res) {
  User.update(
    { _id: req.body.userId },
    {
      $push: { meetings: req.body.meetingId },
    },
    function (err, data) {
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
};

// Receives an userId and a meetingId as input
// Removes the meetingId from the user's meetings list
exports.removeMeeting = async function (req, res) {
  User.update(
    { _id: req.body.userId },
    {
      $pull: { meetings: req.body.meetingId },
    },
    function (err, data) {
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
};

// Receives userId as input
// Sends the user's schedule
exports.viewSchedule = async function (req, res) {
  User.findById(req.params.userId, { schedule: 1 }, function (err, data) {
    if (err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      });
    } else {
      res.json({
        status: res.statusCode,
        message: "Successfully retrieved user schedule",
        data: data,
      });
    }
  });
};

// Receives userId and schedule as input
// Sets the schedule for the user to the given schedule
exports.setSchedule = async function (req, res) {
  User.updateOne(
    { _id: req.body.userId },
    {
      $set: { schedule: req.body.schedule },
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          message: "Successfully updated user schedule",
          data: data,
        });
      }
    }
  );
};

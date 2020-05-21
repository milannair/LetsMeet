// Import user model
User = require("../models/userModel");
const bcrypt = require("bcrypt");

var socket = require('../../server');

module.exports = {
  register: async (req, res) => {
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("Username is taken");
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
  },
  login: async (req, res) => {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("Invalid email or password");

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("Invalid email or password");
    res.send(true);
  },
  view: async (req, res) => {
    const singleUser = await User.findById(req.params.userId).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.json(singleUser);
  },

  delete: async (req, res) => {
    const deleteRes = await User.findByIdAndDelete(req.params.userId).catch(
      (err) =>
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        })
    );
    res.status(200).json(deleteRes);
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
      $push: { requests: req.body.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(groupReq);
  },

  removeGroupRequest: async (req, res) => {
    const removeReq = User.findByIdAndUpdate(req.params.userId, {
      $pull: { requests: req.body.groupId },
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
    const addGroup = User.findByIdAndUpdate(req.params.id, {
      $push: { groups: req.body.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(addGroup);
  },

  removeGroup: async (req, res) => {
    const removeGroup = User.findByIdAndUpdate(req.params.id, {
      $pull: { groups: req.body.groupId },
    }).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.status(200).json(removeGroup);
  },
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

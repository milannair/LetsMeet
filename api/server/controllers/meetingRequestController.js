MeetingRequest = require("../models/meetingRequestModel");
var socket = require("../../server");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Create a new meeting request
exports.create = function (req, res) {
  try {
    jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  let meetingRequest = new MeetingRequest();
  meetingRequest.author = req.body.author;
  meetingRequest.groupId = req.body.groupId;
  meetingRequest.name = req.body.name ? req.body.name : "Meeting";
  meetingRequest.isUnanimousMeetingRequest = req.body.isUnanimousMeetingRequest;
  meetingRequest.requestedOptions = req.body.requestedOptions;
  meetingRequest.deadline = req.body.deadline;
  meetingRequest.status = req.body.status;

  meetingRequest.save(function (err) {
    if (err) {
      res.json({
        status: 500,
        erroMessage: err.message,
        errorName: err.name,
      });
    } else {
      res.json({
        status: res.statusCode,
        message: "Meeting Request created successfully",
        data: meetingRequest,
      });
      socket.io.in(meetingRequest.groupId).emit(meetingRequest);
    }
  });
};

// Delete a Meeting Request
exports.delete = function (req, res) {
  try {
    jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  MeetingRequest.findByIdAndRemove(req.params.meetingRequestId, function (
    err,
    data
  ) {
    if (err) {
      res.json({
        status: 500,
        erroMessage: err.message,
        errorName: err.name,
      });
    } else {
      res.json({
        status: res.statusCode,
        data: data,
      });
    }
  });
};

// Gets all the data about the meeting request
exports.view = function (req, res) {
  try {
    jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  MeetingRequest.findById(req.params.meetingRequestId, function (err, data) {
    if (err) {
      res.json({
        status: 500,
        erroMessage: err.message,
        errorName: err.name,
      });
    } else {
      res.json({
        status: res.statusCode,
        data: data,
      });
    }
  });
};

// Update meeting name
exports.rename = function (req, res) {
  try {
    jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  MeetingRequest.updateOne(
    { _id: req.params.meetingRequestId },
    {
      name: req.params.name,
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          erroMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          data: data,
        });
      }
    }
  );
};

// Update poll type
exports.updateRequestType = function (req, res) {
  try {
    jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  MeetingRequest.updateOne(
    { _id: req.params.isUnanimousMeetingRequest },
    {
      isUnanimousMeetingRequest: req.params.isUnanimousMeetingRequest,
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          erroMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          data: data,
        });
      }
    }
  );
};

// Receives an array of options and adds them
// to the existing array of requested times
exports.addRequestedOptions = function (req, res) {
  try {
    jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  MeetingRequest.updateOne(
    { _id: req.params.meetingRequestId },
    {
      $push: { requestedTimes: { $each: req.params.requestedOptions } },
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          erroMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          data: data,
        });
      }
    }
  );
};

// Receives an array of new requested times and removes them
// from the existing array of requested times
exports.removeRequestedOptions = function (req, res) {
  try {
    jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  MeetingRequest.updateOne(
    { _id: req.params.meetingRequestId },
    {
      $pull: { requestedOptions: { $each: req.params.requestedOptions } },
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          erroMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          data: data,
        });
      }
    }
  );
};

// Update request status in the meeting request
exports.updateRequestStatus = function (req, res) {
  try {
    jwt.verify(req.params.auth_token, process.env.ACCESS_TOKEN);
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
  MeetingRequest.updateOne(
    { _id: req.params.meetingRequestId },
    {
      status: req.params.status,
    },
    function (err, data) {
      if (err) {
        res.json({
          status: 500,
          erroMessage: err.message,
          errorName: err.name,
        });
      } else {
        res.json({
          status: res.statusCode,
          data: data,
        });
      }
    }
  );
};

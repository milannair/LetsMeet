// meetingController.js
// Import meeting model
Meeting = require("../models/meetingModel");
// Import dependent models
User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
 * Creates a new meeting.
 *
 * Required body parameters:
 *  author: ObjectId - the meeting's author
 *  name: String - the meeting's name
 *  groupId: ObjectId - the ID of the group that holds the meeting
 *  startTime: Date - the start time of the meeting
 *  endTime: Date - the end time of the meeting
 *
 * Optional body parameters:
 *  confirmed: Boolean (default: false) - whether the meeting is confirmed
 *
 * Returns:
 *  500 if an internal server error occurs
 *  The created meeting if the operation was successful
 */
exports.create = function (req, res) {
  const meeting = new Meeting();
  meeting.author = req.body.author;
  meeting.name = req.body.name;
  meeting.groupID = req.body.groupId;
  meeting.startTime = req.body.startTime;
  meeting.endTime = req.body.endTime;
  meeting.confirmed = req.body.confirmed ? req.body.confirmed : false;
  meeting.save(function (err) {
    if (err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      });
    } else {
      res.json({
        status: res.statusCode,
        message: "Meeting created successfully",
        data: meeting,
      });
    }
  });
};

/*
 * Deletes a meeting.
 *
 * Required query parameters:
 *  meetingId: ObjectId - the meeting's ID
 *
 * Returns:
 *  500 if an internal server error occurs
 *  The deleted meeting if the operation was successful
 */
exports.delete = function (req, res) {
  Meeting.findByIdAndRemove(req.params.meetingId, function (err, meeting) {
    if (err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      });
    } else {
      res.json({
        status: res.statusCode,
        data: meeting,
      });
    }
  });
};

/*
 * Gets all the data about a meeting.
 *
 * Required query parameters:
 *  meetingId: ObjectId - the meeting's ID
 *
 * Returns:
 *  500 if an internal server error occurs
 *  The meeting's data if the operation was successful
 */
exports.view = function (req, res) {
  Meeting.findById(req.params.meetingId, function (err, meeting) {
    if (err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      });
    } else {
      res.json({
        status: res.statusCode,
        data: meeting,
      });
    }
  });
};

/*
 * Confirms a meeting.
 *
 * Required query parameters:
 *  meetingId: ObjectId - the meeting's ID
 *
 * Returns:
 *  500 if an internal server error occurs
 *  404 if the meeting does not exist
 *  409 if the meeting is already confirmed
 *  The updated meeting's data if the operation was successful
 */
exports.confirm = function (req, res) {
  updateMeetingConfirmation(req, res, true);
};

/*
 * Unconfirms a meeting.
 *
 * Required query parameters:
 *  meetingId: ObjectId - the meeting's ID
 *
 * Returns:
 *  500 if an internal server error occurs
 *  404 if the meeting does not exist
 *  409 if the meeting is already not confirmed
 *  The updated meeting's data if the operation was successful
 */
exports.unconfirm = function (req, res) {
  updateMeetingConfirmation(req, res, false);
};

/*
 * Internal helper function
 *
 * Updates the confirmation flag for a meeting.
 *
 * Function parameters:
 *  req: the request received from client
 *  res: the response to be sent to client
 *  toConfirm - Boolean: 'true' for a confirming operation,
 *    or 'false for an unconfirming operation
 *
 * Required query parameters:
 *  meetingId: ObjectId - the meeting's ID
 *
 * Response will be updated with:
 *  500 if an internal server error occurs
 *  404 if the meeting does not exist
 *  409 if the meeting is already confirmed
 *  The updated meeting's data if the operation was successful
 */
function updateMeetingConfirmation(req, res, toConfirm) {
  Meeting.findById(req.params.meetingId, function (err, meeting) {
    if (err) {
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      });
    } else if (meeting) {
      const confirmed = meeting.confirmed;
      if (confirmed === toConfirm) {
        if (toConfirm) {
          res.json({
            status: 409,
            message: "Meeting already confirmed",
          });
        } else {
          res.json({
            status: 409,
            message: "Meeting already not confirmed",
          });
        }
      } else {
        meeting.confirmed = toConfirm;
        meeting.save(function (err) {
          if (err) {
            res.json({
              status: 500,
              errorMessage: err.message,
              errorName: err.name,
            });
          } else {
            if (toConfirm) {
              res.json({
                status: res.statusCode,
                message: "Meeting confirmed successfully",
                data: meeting,
              });
            } else {
              res.json({
                status: res.statusCode,
                message: "Meeting unconfirmed successfully",
                data: meeting,
              });
            }
          }
        });
      }
    } else {
      res.json({
        status: 404,
        message: "Meeting not exist",
      });
    }
  });
}

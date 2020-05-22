// meetingController.js
// Import meeting model
Meeting = require("../models/meetingModel");
// Import dependent models
User = require("../models/userModel");

module.exports = {
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
  create: async (req, res) => {
    req.body.confirmed = req.body.confirmed ? req.body.confirmed : false;
    const newMeeting = await Meeting.create(req.body).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.json(newMeeting);
  },

  /*
   * Deletes a meeting.
   *
   * Required query parameters:
   *  meetingId: ObjectId - the meeting's ID
   *
   * Returns:
   *  500 if an internal server error occurs
   *  'null' if no meeting with the specified ID is found
   *  The deleted meeting if the operation was successful
   */
  delete: async (req, res) => {
    const meeting = await Meeting.findByIdAndDelete(req.params.meetingId).catch(
      (err) =>
        res.json({
          status: 500,
          errorMessage: err.message,
          errorName: err.name,
        })
    );
    res.status(200).json(meeting);
  },

  /*
   * Gets all the data about a meeting.
   *
   * Required query parameters:
   *  meetingId: ObjectId - the meeting's ID
   *
   * Returns:
   *  500 if an internal server error occurs
   *  'null' if no meeting with the specified ID is found
   *  The meeting's data if the operation was successful
   */
  view: async (req, res) => {
    const meeting = await Meeting.findById(req.params.meetingId).catch((err) =>
      res.json({
        status: 500,
        errorMessage: err.message,
        errorName: err.name,
      })
    );
    res.json(meeting);
  },

  /*
   * Updates a meeting with data included in the request body.
   *
   * Required query parameters:
   *  meetingId: ObjectId - the meeting's ID
   *
   * Returns:
   *  500 if an internal server error occurs
   *  'null' if no meeting with the specified ID is found
   *  The updated meeting if the operation was successful
   */
  update: async (req, res) => {
    const meeting = await Meeting.findByIdAndUpdate(
      req.params.meetingId,
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
    res.status(200).json(meeting);
  },
};

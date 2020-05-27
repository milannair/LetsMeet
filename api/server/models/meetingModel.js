var mongoose = require("mongoose");

var meetingSchema = mongoose.Schema({
  author: mongoose.Types.ObjectId, //UserID
  name: String,
  groupID: mongoose.Types.ObjectId,
  startTime: Date,
  endTime: Date,
  confirmed: Boolean,
});

var Meeting = (module.exports = mongoose.model("meeting", meetingSchema));

module.exports.get = function (callback, limit) {
  Meeting.find(callback).limit(limit);
};

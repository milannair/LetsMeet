var mongoose = require("mongoose");

var DayTime = require("./dayTimeModel");

var meetingSchema = mongoose.Schema({
  author: mongoose.Types.ObjectId, //UserID
  name: String,
  groupID: mongoose.Types.ObjectId,
  time: DayTime,
});

var Meeting = (module.exports = mongoose.model("meeting", meetingSchema));

module.exports.get = function (callback, limit) {
  Meeting.find(callback).limit(limit);
};

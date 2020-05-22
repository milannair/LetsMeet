var mongoose = require("mongoose");

var meetingSchema = mongoose.Schema({
  author: mongoose.Types.ObjectId, //UserID
  name: String,
  group: mongoose.Types.ObjectId,
  start: Date,
  end: Date,
  confirmed: Boolean,
});

var Meeting = (module.exports = mongoose.model("meeting", meetingSchema));

module.exports.get = function (callback, limit) {
  Meeting.find(callback).limit(limit);
};

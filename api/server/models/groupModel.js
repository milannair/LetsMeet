var mongoose = require("mongoose");

var MeetingRequest = require("./meetingRequestModel");
//var Schedule = require("./scheduleModel");

var groupSchema = mongoose.Schema({
  meetingRequests: [mongoose.Types.ObjectId],
  memberRequests: [mongoose.Types.ObjectId], //UserID
  members: [mongoose.Types.ObjectId], //UserID
  owner: mongoose.Types.ObjectId, //UserID
  name: {type: String, required : true}
  //schedule: [Schedule],
});

var Group = (module.exports = mongoose.model("group", groupSchema));

module.exports.get = function (callback, limit) {
  Group.find(callback).limit(limit);
};

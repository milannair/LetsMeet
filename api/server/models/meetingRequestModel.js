var mongoose = require("mongoose");

var Option = require("./optionModel");

var meetingRequestSchema = mongoose.Schema({
  author: {type : mongoose.Types.ObjectId, required: true},
  groupId: {type : mongoose.Types.ObjectId, required: true},
  name: String,
  isUnanimousMeetingRequest: {type : Boolean, required: true},
  requestedOptions: [mongoose.Types.ObjectId], // list of options
  deadline: { type: Date, required: true },
  status: Number,
});

var MeetingRequest = (module.exports = mongoose.model(
  "meetingRequest",
  meetingRequestSchema
));

module.exports.get = function (callback, limit) {
  MeetingRequest.find(callback).limit(limit);
};

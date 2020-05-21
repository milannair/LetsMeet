var mongoose = require("mongoose");

var Option = require("./optionModel");

var meetingRequestSchema = mongoose.Schema({
  author: {type : mongoose.Types.ObjectId, required: true},
  groupID: {type : mongoose.Types.ObjectId, required: true},
  name: String,
  isUniPoll: {type : Boolean, required: true},
  multiPoll: [Option],
  uniPoll: Option,
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

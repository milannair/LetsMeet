var mongoose = require("mongoose");

var Option = require("./optionModel");

var meetingRequestSchema = mongoose.Schema({
  author: {type : mongoose.Types.ObjectId, required: true},
  deadline: { type: Date, required: true },
  groupID: {type : mongoose.Types.ObjectId, required: true},
  multiPoll: [Option],
  uniPoll: Option,
  status: Number,
  isUniPoll: {type : Boolean, required: true},
  // count of votes so we don't need to do the sum of all options to display total votes
  totalVotes: Number, 
  name: String,
});

var MeetingRequest = (module.exports = mongoose.model(
  "meetingRequest",
  meetingRequestSchema
));

module.exports.get = function (callback, limit) {
  MeetingRequest.find(callback).limit(limit);
};

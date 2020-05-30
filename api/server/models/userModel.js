var mongoose = require("mongoose");

var Group = require("./groupModel");

var userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  displayName: { type: String, required: true },
  phone: { type: String, required: true },
  password: String,
  create_date: { type: Date, default: Date.now },
  meetings: { type: [mongoose.Types.ObjectId] }, //MeetingID
  requests: { type: [mongoose.Types.ObjectId] }, //GroupID
  groups: { type: [mongoose.Types.ObjectId] }, //GroupID
  schedule: [{ startTime: Date, endTime: Date }]
});

var User = (module.exports = mongoose.model("user", userSchema));

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};

var mongoose = require("mongoose");

var Group = require("./groupModel");

var userSchema = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  meetings: { type: [mongoose.Types.ObjectId] }, //MeetingID
  requests: { type: [mongoose.Types.ObjectId] }, //GroupID
  groups: { type: [mongoose.Types.ObjectId] }, //GroupID
  displayName: String,
  phone: String,
  password: String,
  create_date: { type: Date, default: Date.now },
});

var User = (module.exports = mongoose.model("user", userSchema));

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};

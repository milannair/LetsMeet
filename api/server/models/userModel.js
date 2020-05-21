var mongoose = require("mongoose");

var Group = require("./groupModel");

var userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  displayName: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  password: String,
  create_date: { type: Date, default: Date.now },
  meetings: { type: [mongoose.Types.ObjectId] }, //MeetingID
  requests: { type: [mongoose.Types.ObjectId] }, //GroupID
  groups: { type: [mongoose.Types.ObjectId] }, //GroupID
});

var User = (module.exports = mongoose.model("user", userSchema));

module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};

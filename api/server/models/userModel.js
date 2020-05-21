var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true, index: true },
  displayName: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    unique: true,
    index: true,
    minlength: 10,
  },
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

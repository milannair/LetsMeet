var mongoose = require("mongoose");
// Setup schema
var userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: String,
  password: String,
  create_date: {
    type: Date,
    default: Date.now,
  },
});
// Export user model
var User = (module.exports = mongoose.model("user", userSchema));
module.exports.get = function (callback, limit) {
  User.find(callback).limit(limit);
};

var mongoose = require("mongoose");

var optionSchema = mongoose.Schema({
  time: Date,
  votes: [mongoose.Types.ObjectId], //UserID
});

var Option = (module.exports = mongoose.model("option", optionSchema));

module.exports.get = function (callback, limit) {
  Option.find(callback).limit(limit);
};

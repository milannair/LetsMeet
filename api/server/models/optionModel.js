var mongoose = require("mongoose");

var optionSchema = mongoose.Schema({
  time: {type: Date, required: true},
  votes: [mongoose.Types.ObjectId], //UserID
  start: {type : Date, required: true},
  end: {type: Date, required: true}
});

var Option = (module.exports = mongoose.model("option", optionSchema));

module.exports.get = function (callback, limit) {
  Option.find(callback).limit(limit);
};

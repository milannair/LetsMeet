var mongoose = require("mongoose");

var dayTimeSchema = mongoose.Schema({
  start: { type: Date, required: true },
  end: { type: Date, required: true },
});

var DayTime = (module.exports = mongoose.model("dayTime", dayTimeSchema));

module.exports.get = function (callback, limit) {
  DayTime.find(callback).limit(limit);
};

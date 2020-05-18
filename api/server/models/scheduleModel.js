var mongoose = require("mongoose");
var DayTime = require("./dayTimeModel");

var scheduleSchema = mongoose.Schema({
  user: mongoose.Types.ObjectId,
  blocks: [DayTime],
  name: { type: String, required: true },
  create_date: { type: Date, default: Date.now },
});

var Schedule = (module.exports = mongoose.model("schedule", scheduleSchema));

module.exports.get = function (callback, limit) {
  Schedule.find(callback).limit(limit);
};

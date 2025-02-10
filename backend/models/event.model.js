const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  }],
  time: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const eventModel = mongoose.model("Event", eventSchema);

module.exports = eventModel;

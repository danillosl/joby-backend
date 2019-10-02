const mongoose = require("mongoose");

const JobSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  tags: [String],
  date: {
    type: Date,
    default: Date.now
  }
});

JobSchema.index({ tags: "text", title: "text", description: "text" });

module.exports = mongoose.model("Jobs", JobSchema);

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const companySchema = new Schema({
  Type: String,
  name: String,
  logo: String,
  about: String,
  package: String,
  info: String,
  code: String,
  InterviewTopics: String,
});

module.exports = mongoose.model("name", companySchema);

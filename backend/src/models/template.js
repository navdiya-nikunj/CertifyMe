const mongoose = require("mongoose");

const templateSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  phrase: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  signature: {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
  },
});

const Template = mongoose.model("Template", templateSchema);

module.exports = Template;

const mongoose = require("mongoose");
const validator = require("validator");

const instituteSchema = new mongoose.Schema({
  instituteName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: (value) => validator.isAlpha(validator.blacklist(value, " ")),
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: (value) => validator.isEmail(value),
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => validator.isStrongPassword(value),
  },
  walletAddress: {
    type: String,
    // unique: true,
  },
  templateIds: {
    type: [mongoose.SchemaTypes.ObjectId],
    ref: "Template",
  },
});

const Institute = mongoose.model("Institute", instituteSchema);

module.exports = Institute;

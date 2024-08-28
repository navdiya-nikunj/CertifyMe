const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
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
  // certificates: {
  //   type: [],
  //   ref: "Certificate",
  // },
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;

const mongoose = require("mongoose");
require("dotenv").config();

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full Name is Required"],
    },
    username: {
      type: String,
      unique: true,
      required: [true, "User Name is Required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email Address is Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number is Required"],
    },
    address: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    otpAuthObject: {
      type: Object,
      default: {},
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);

module.exports = User;

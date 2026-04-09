const mongoose = require("mongoose");
require("dotenv").config();

const ContactUsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email Address is Required"],
    },
    phone: {
      type: String,
      required: [true, "Phone Number is Required"],
    },
    subject: {
      type: String,
      required: [true, "Subject is Required"],
    },
    message: {
      type: String,
      required: [true, "Message is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const ContactUs = mongoose.model("ContactUs", ContactUsSchema);

module.exports = ContactUs;

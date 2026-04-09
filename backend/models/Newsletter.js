const mongoose = require("mongoose");
require("dotenv").config();

const NewsletterSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, "Email Address is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

module.exports = Newsletter;

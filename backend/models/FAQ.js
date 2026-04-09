const mongoose = require("mongoose");
require("dotenv").config();

const FAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      unique: true,
      required: [true, "FAQ Question is Required"],
    },
    answer: {
      type: String,
      required: [true, "FAQ Answer is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const FAQ = mongoose.model("FAQ", FAQSchema);

module.exports = FAQ;

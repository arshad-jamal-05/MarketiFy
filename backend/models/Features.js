const mongoose = require("mongoose");
require("dotenv").config();

const FeaturesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Feature Name is Required"],
    },
    icon: {
      type: String,
      required: [true, "Feature Icon is Required"],
    },
    shortDescription: {
      type: String,
      required: [true, "Feature Short Description is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Features = mongoose.model("Features", FeaturesSchema);

module.exports = Features;

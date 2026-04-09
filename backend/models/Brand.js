const mongoose = require("mongoose");
require("dotenv").config();

const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Brand Name is Required"],
    },
    pic: {
      type: String,
      required: [true, "Brand Pic is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Brand = mongoose.model("Brand", BrandSchema);

module.exports = Brand;

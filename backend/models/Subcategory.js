const mongoose = require("mongoose");
require("dotenv").config();

const SubcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Subcategory Name is Required"],
    },
    pic: {
      type: String,
      required: [true, "Subcategory Pic is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

module.exports = Subcategory;

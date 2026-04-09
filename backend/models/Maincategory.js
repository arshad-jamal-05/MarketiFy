const mongoose = require("mongoose");
require("dotenv").config();

const MaincategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Maincategory Name is Required"],
    },
    pic: {
      type: String,
      required: [true, "Maincategory Pic is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Maincategory = mongoose.model("Maincategory", MaincategorySchema);

module.exports = Maincategory;

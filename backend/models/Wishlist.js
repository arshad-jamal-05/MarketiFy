const mongoose = require("mongoose");
require("dotenv").config();

const WishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is Required"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is Required"],
    },
  },
  { timestamps: true },
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);

module.exports = Wishlist;

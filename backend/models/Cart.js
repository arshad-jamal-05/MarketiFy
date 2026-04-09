const mongoose = require("mongoose");
require("dotenv").config();

const CartSchema = new mongoose.Schema(
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
    color: {
      type: String,
      required: [true, "Product Color is Required"],
    },
    size: {
      type: String,
      required: [true, "Product Size is Required"],
    },
    qty: {
      type: Number,
      required: [true, "Quantity is Required"],
    },
    total:{
      type: Number,
      required: [true, "Total Amount is Required"],
    }
  },
  { timestamps: true },
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;

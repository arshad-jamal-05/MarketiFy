const mongoose = require("mongoose");
require("dotenv").config();

const CheckoutSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is Required"],
    },
    deliveryAddress: {
      type: Object,
      required: [true, "Delivery Address is Required"],
    },
    orderStatus: {
      type: String,
      default: "Order is Placed",
    },
    paymentMode: {
      type: String,
      default: "COD",
    },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    rppid: {
      // RazorPay Payment ID
      type: String,
      default: "",
    },
    subtotal: {
      type: Number,
      required: [true, "Subtotal Amount is Required"],
    },
    shipping: {
      type: Number,
      required: [true, "Shipping Amount is Required"],
    },
    total: {
      type: Number,
      required: [true, "Total Amount is Required"],
    },
    products: [
      {
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
        total: {
          type: Number,
          required: [true, "Total Amount is Required"],
        },
      },
    ],
  },
  { timestamps: true },
);

const Checkout = mongoose.model("Checkout", CheckoutSchema);

module.exports = Checkout;

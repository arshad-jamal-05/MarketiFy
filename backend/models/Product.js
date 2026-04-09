const mongoose = require("mongoose");
require("dotenv").config();

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "Product Name is Required"],
    },
    maincategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Maincategory",
      required: [true, "Maincategory is Required"],
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory",
      required: [true, "Subcategory is Required"],
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: [true, "Product Brand is Required"],
    },
    color: {
      type: Array,
      required: [true, "Product Color is Required"],
    },
    size: {
      type: Array,
      required: [true, "Product Size is Required"],
    },
    basePrice: {
      type: Number,
      required: [true, "Base Price of Product is Required"],
    },
    discount: {
      type: Number,
      required: [true, "Discount on Product is Required"],
    },
    finalPrice: {
      type: Number,
      required: [true, "Final Price of Product is Required"],
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock Quantity of Product is Required"],
    },
    description: {
      type: String,
      default: "",
    },
    pic: {
      type: Array,
      required: [true, "Product Pic is Required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;

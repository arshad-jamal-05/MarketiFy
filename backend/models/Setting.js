const mongoose = require("mongoose");
require("dotenv").config();

const SettingSchema = new mongoose.Schema(
  {
    map1: {
      type: String,
      default: "",
    },
    map2: {
      type: String,
      default: "",
    },
    siteName: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    whatsapp: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    privacyPolicy: {
      type: String,
      default: "",
    },
    termsAndConditions: {
      type: String,
      default: "",
    },
    returnPolicy: {
      type: String,
      default: "",
    },
    cancellationPolicy: {
      type: String,
      default: "",
    },
    refundPolicy: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

const Setting = mongoose.model("Setting", SettingSchema);

module.exports = Setting;

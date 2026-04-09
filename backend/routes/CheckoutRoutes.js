const Checkout = require("express").Router();
const {
  authSuperAdmin,
  authAdmin,
  authBuyer,
} = require("../middlewares/authentication");
const {
  createRecord,
  getRecord,
  getUserRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/CheckoutController");

Checkout.post("/", authBuyer, createRecord);
Checkout.get("/", authAdmin, getRecord);
Checkout.get("/user/:userid", authBuyer, getUserRecord);
Checkout.get("/:_id", authBuyer, getSingleRecord);
Checkout.put("/:_id", authAdmin, updateRecord);
Checkout.delete("/:_id", authSuperAdmin, deleteRecord);

module.exports = Checkout;

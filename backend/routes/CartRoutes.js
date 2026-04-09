const Cart = require("express").Router();
const { authBuyer } = require("../middlewares/authentication");
const {
  createRecord,
  getRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/CartController");

Cart.post("/", authBuyer, createRecord);
Cart.get("/user/:userid", authBuyer, getRecord);
Cart.get("/:_id", authBuyer, getSingleRecord);
Cart.put("/:_id", authBuyer, updateRecord);
Cart.delete("/:_id", authBuyer, deleteRecord);

module.exports = Cart;

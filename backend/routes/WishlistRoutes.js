const Wishlist = require("express").Router();
const { authBuyer } = require("../middlewares/authentication");
const {
  createRecord,
  getRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/WishlistController");

Wishlist.post("/", authBuyer, createRecord);
Wishlist.get("/user/:userid", authBuyer, getRecord);
Wishlist.get("/:_id", authBuyer, getSingleRecord);
Wishlist.put("/:_id", authBuyer, updateRecord);
Wishlist.delete("/:_id", authBuyer, deleteRecord);

module.exports = Wishlist;

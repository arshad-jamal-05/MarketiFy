const Product = require("express").Router();
const { productUploader } = require("../middlewares/fileUploader");
const {
  authSuperAdmin,
  authAdmin,
  authPublic,
  authBuyer,
} = require("../middlewares/authentication");
const {
  createRecord,
  getRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/ProductController");

Product.post("/", authAdmin, productUploader.array("pic"), createRecord);
Product.get("/", authPublic, getRecord);
Product.get("/:_id", authPublic, getSingleRecord);
Product.put("/:_id", authBuyer, productUploader.array("pic"), updateRecord);
Product.delete("/:_id", authSuperAdmin, deleteRecord);

module.exports = Product;

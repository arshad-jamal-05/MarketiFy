const Subcategory = require("express").Router();
const { subcategoryUploader } = require("../middlewares/fileUploader");
const {
  authSuperAdmin,
  authAdmin,
  authPublic,
} = require("../middlewares/authentication");
const {
  createRecord,
  getRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
} = require("../controllers/SubcategoryController");

Subcategory.post("/",authAdmin, subcategoryUploader.single("pic"), createRecord);
Subcategory.get("/",authPublic, getRecord);
Subcategory.get("/:_id",authPublic, getSingleRecord);
Subcategory.put("/:_id",authAdmin, subcategoryUploader.single("pic"), updateRecord);
Subcategory.delete("/:_id",authSuperAdmin, deleteRecord);

module.exports = Subcategory;

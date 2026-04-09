const Maincategory = require("express").Router();
const { maincategoryUploader } = require("../middlewares/fileUploader");
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
} = require("../controllers/MaincategoryController");

Maincategory.post("/",authAdmin, maincategoryUploader.single("pic"), createRecord);
Maincategory.get("/",authPublic, getRecord);
Maincategory.get("/:_id",authPublic, getSingleRecord);
Maincategory.put("/:_id",authAdmin, maincategoryUploader.single("pic"), updateRecord);
Maincategory.delete("/:_id",authSuperAdmin, deleteRecord);

module.exports = Maincategory;

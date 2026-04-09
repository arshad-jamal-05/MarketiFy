const Brand = require("express").Router();
const { brandUploader } = require("../middlewares/fileUploader");
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
} = require("../controllers/BrandController");

Brand.post("/", authAdmin, brandUploader.single("pic"), createRecord);
Brand.get("/", authPublic, getRecord);
Brand.get("/:_id", authPublic, getSingleRecord);
Brand.put("/:_id", authAdmin, brandUploader.single("pic"), updateRecord);
Brand.delete("/:_id", authSuperAdmin, deleteRecord);

module.exports = Brand;

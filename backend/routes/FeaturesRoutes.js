const Features = require("express").Router();
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
} = require("../controllers/FeaturesController");

Features.post("/", authAdmin, createRecord);
Features.get("/", authPublic, getRecord);
Features.get("/:_id", authPublic, getSingleRecord);
Features.put("/:_id", authAdmin, updateRecord);
Features.delete("/:_id", authSuperAdmin, deleteRecord);

module.exports = Features;

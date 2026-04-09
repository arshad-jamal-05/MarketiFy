const ContactUs = require("express").Router();
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
} = require("../controllers/ConatctUsController");

ContactUs.post("/", authPublic, createRecord);
ContactUs.get("/", authAdmin, getRecord);
ContactUs.get("/:_id", authAdmin, getSingleRecord);
ContactUs.put("/:_id", authAdmin, updateRecord);
ContactUs.delete("/:_id", authSuperAdmin, deleteRecord);

module.exports = ContactUs;

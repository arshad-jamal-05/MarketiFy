const FAQ = require("express").Router();
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
} = require("../controllers/FAQController");

FAQ.post("/", authAdmin, createRecord);
FAQ.get("/", authPublic, getRecord);
FAQ.get("/:_id", authPublic, getSingleRecord);
FAQ.put("/:_id", authAdmin, updateRecord);
FAQ.delete("/:_id", authSuperAdmin, deleteRecord);

module.exports = FAQ;

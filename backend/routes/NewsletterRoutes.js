const Newsletter = require("express").Router();
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
} = require("../controllers/NewsletterController");

Newsletter.post("/", authPublic, createRecord);
Newsletter.get("/", authAdmin, getRecord);
Newsletter.get("/:_id", authAdmin, getSingleRecord);
Newsletter.put("/:_id", authAdmin, updateRecord);
Newsletter.delete("/:_id", authSuperAdmin, deleteRecord);

module.exports = Newsletter;

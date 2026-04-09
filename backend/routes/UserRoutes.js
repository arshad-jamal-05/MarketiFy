const User = require("express").Router();
const {
  authPublic,
  authBuyer,
} = require("../middlewares/authentication");
const {
  createRecord,
  getRecord,
  getSingleRecord,
  updateRecord,
  deleteRecord,
  login,
  forgetPassword1,
  forgetPassword2,
  forgetPassword3,
} = require("../controllers/UserController");

User.post("/", authPublic, createRecord);
User.get("/", authBuyer, getRecord);
User.get("/:_id", authBuyer, getSingleRecord);
User.put("/:_id", authBuyer, updateRecord);
User.delete("/:_id", authBuyer, deleteRecord);
User.post("/login", authPublic, login);
User.post("/forget-password-1",authPublic, forgetPassword1);
User.post("/forget-password-2",authPublic, forgetPassword2);
User.post("/forget-password-3",authPublic, forgetPassword3);

module.exports = User;

const Setting = require("express").Router();
const { settingUploader } = require("../middlewares/fileUploader");
const {
  authSuperAdmin,
  authAdmin,
  authPublic,
} = require("../middlewares/authentication");
const { createRecord, getRecord } = require("../controllers/SettingController");

Setting.post(
  "/",
  settingUploader.fields([
    // { name: "logoTop" }, 
    // { name: "logoBottom" }
  ]),
  createRecord,
);
Setting.get("/", getRecord);

module.exports = Setting;

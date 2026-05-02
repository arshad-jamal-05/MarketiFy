const Setting = require("express").Router();
const { createRecord, getRecord } = require("../controllers/SettingController");

Setting.post("/", createRecord);
Setting.get("/", getRecord);

module.exports = Setting;

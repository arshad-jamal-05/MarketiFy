const Setting = require("../models/Setting");

async function createRecord(req, res) {
  try {
    var data = await Setting.findOne();
    if (data) {
      data.map1 = req.body.map1;
      data.map2 = req.body.map2;
      data.siteName = req.body.siteName;
      data.address = req.body.address;
      data.email = req.body.email;
      data.phone = req.body.phone;
      data.whatsapp = req.body.whatsapp;
      data.facebook = req.body.facebook;
      data.instagram = req.body.instagram;
      data.twitter = req.body.twitter;
      data.linkedin = req.body.linkedin;
      data.privacyPolicy = req.body.privacyPolicy;
      data.termsAndConditions = req.body.termsAndConditions;
      data.returnPolicy = req.body.returnPolicy;
      data.cancellationPolicy = req.body.cancellationPolicy;
      data.refundPolicy = req.body.refundPolicy;
    } else {
      var data = new Setting(req.body);
    }
    await data.save();
    res.send({
      result: "Done",
      data: data,
    });
  } catch (error) {
    res.send({
      result: "Fail",
      reason: "Internal Server Error",
    });
  }
}

async function getRecord(req, res) {
  try {
    let data = await Setting.find();
    res.send({
      result: "Done",
      data: data ?? [],
    });
  } catch (error) {
    res.send({
      result: "Fail",
      reason: "Internal Server Error",
    });
  }
}

module.exports = {
  createRecord: createRecord,
  getRecord: getRecord,
};

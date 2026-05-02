const Features = require("../models/Features");

async function createRecord(req, res) {
  try {
    let data = new Features(req.body);
    await data.save();
    res.send({
      result: "Done",
      data: data,
    });
  } catch (error) {
    let err = [];
    if (error?.keyValue) {
      err = Object.keys(error?.keyValue).map((key) => [
        key,
        `${key} is already taken`,
      ]);
    } else {
      err = Object.keys(error?.errors).map((key) => [
        key,
        error.errors[key].message,
      ]);
    }
    let errorMessage = Object.fromEntries(err);

    res.status(Object.values(errorMessage).length ? 400 : 500).send({
      result: "Fail",
      reason: Object.values(errorMessage).length
        ? errorMessage
        : "Internal Server Error",
    });
  }
}

async function getRecord(req, res) {
  try {
    let data = await Features.find().sort({ _id: -1 });
    res.send({
      result: "Done",
      count: data.length,
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      result: "Fail",
      reason: "Internal Server Error",
    });
  }
}

async function getSingleRecord(req, res) {
  try {
    let data = await Features.findOne({ _id: req.params._id });
    if (data) {
      res.send({
        result: "Done",
        data: data,
      });
    } else {
      res.status(404).send({
        result: "Fail",
        reason: "Record Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      result: "Fail",
      reason: "Internal Server Error",
    });
  }
}

async function updateRecord(req, res) {
  try {
    let data = await Features.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name ?? data.name;
      data.icon = req.body.icon ?? data.icon;
      data.description = req.body.description ?? data.description;
      data.status = req.body.status ?? data.status;

      await data.save();

      res.send({
        result: "Done",
        data: data,
      });
    } else {
      res.status(404).send({
        result: "Fail",
        reason: "Record Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    if (req.file) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (error) {
        console.log(error);
      }
    }

    let errorMessage = {};
    error?.keyValue && error?.keyValue?.name
      ? (errorMessage.name = "Features Name is Already Exist")
      : "";
    error?.errors?.name
      ? (errorMessage.name = error?.errors?.name?.message)
      : "";
    error?.errors?.pic ? (errorMessage.pic = error?.errors?.pic?.message) : "";
    res.status(Object.values(errorMessage).length ? 400 : 500).send({
      result: "Fail",
      reason: Object.values(errorMessage).length
        ? errorMessage
        : "Internal Server Error",
    });
  }
}

async function deleteRecord(req, res) {
  try {
    let data = await Features.findOne({ _id: req.params._id });
    if (data) {
      await data.deleteOne();
      res.send({
        result: "Done",
        data: data,
      });
    } else {
      res.status(404).send({
        result: "Fail",
        reason: "Record Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      result: "Fail",
      reason: "Internal Server Error",
    });
  }
}

module.exports = {
  createRecord: createRecord,
  getRecord: getRecord,
  getSingleRecord: getSingleRecord,
  updateRecord: updateRecord,
  deleteRecord: deleteRecord,
};

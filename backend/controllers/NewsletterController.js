const Newsletter = require("../models/Newsletter");
const mailer = require("../mailer/index");

async function createRecord(req, res) {
  try {
    let data = new Newsletter(req.body);
    await data.save();
    res.send({
      result: "Done",
      data: data,
    });
    mailer.sendMail(
      {
        from: process.env.MAILER,
        to: data.email,
        subject: `Newsletter Subscription Confirmed : Team ${process.env.SITE_NAME}`,
        html: `

            <tr>
            <td style="background:#13c5dd; color:#ffffff; text-align:center; padding:22px; font-size:24px; font-weight:bold;">
            Marketify
            </td>
            </tr>

            <tr>
            <td style="padding:40px 30px; color:#333333;">

            <h2 style="color:#13c5dd; margin-top:0;">You're Subscribed 🎉</h2>

            <p style="font-size:16px; line-height:24px;">
            Thank you for subscribing to our newsletter. You will now receive updates about new arrivals, exclusive deals, special discounts, and trending products directly in your inbox.
            </p>

            <p style="font-size:16px; line-height:24px;">
            Stay tuned for exciting offers and be the first to know about our latest collections.
            </p>

            <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto;">
            <tr>
            <td style="background:#13c5dd; padding:14px 30px; border-radius:5px;">
            <a href="${process.env.SITE_URL}" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
            Start Shopping
            </a>
            </td>
            </tr>
            </table>

            <p style="font-size:14px; color:#777777; text-align:center;">
            If you did not subscribe to this newsletter, you can safely ignore this email.
            </p>

            </td>
            </tr>

            <tr>
            <td style="background:#f1f5ff; text-align:center; padding:20px; font-size:13px; color:#555555;">
            © 2026 Marketify. All rights reserved. <br>
            You're receiving this email because you subscribed to our newsletter.
            </td>
            </tr>

          `,
      },
      (error) => {
        if (error) {
          console.log(error);
        }
      },
    );
  } catch (error) {
    let err = [];
    if (error?.keyValue) {
      err = Object.keys(error?.keyValue).map((key) => [
        key,
        `${key} Has Been Already Registered With Us`,
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
    let data = await Newsletter.find().sort({ _id: -1 });
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
    let data = await Newsletter.findOne({ _id: req.params._id });
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
    let data = await Newsletter.findOne({ _id: req.params._id });
    if (data) {
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

    let errorMessage = {};
    error?.keyValue && error?.keyValue?.question
      ? (errorMessage.question = "Newsletter Question is Already Exist")
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
    let data = await Newsletter.findOne({ _id: req.params._id });
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

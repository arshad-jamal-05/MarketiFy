const Checkout = require("../models/Checkout");
const mailer = require("../mailer/index");

async function createRecord(req, res) {
  try {
    let data = new Checkout(req.body);
    await data.save();

    let finalData = await Checkout.findOne({ _id: data._id })
      .populate("user", ["name", "username"])
      .populate({
        path: "products.product",
        select: "name brand finalPrice stockQuantity stock pic",
        populate: {
          path: "brand",
          select: "-_id name",
        },
        options: {
          slice: {
            pic: 1,
          },
        },
      });

    res.send({
      result: "Done",
      data: finalData,
    });
    mailer.sendMail(
      {
        from: process.env.MAILER,
        to: data.deliveryAddress?.email,
        subject: `Your Order Has Been Successfully Placed : Team ${process.env.SITE_NAME}`,
        html: `
                <tr>
                <td style="background:#0a1f44; color:#ffffff; text-align:center; padding:22px; font-size:26px; font-weight:bold;">
                Marketify
                </td>
                </tr>

                <tr>
                <td style="padding:40px 30px; color:#333333;">

                <h2 style="color:#0a1f44; margin-top:0;">🎉 Order Confirmed!</h2>

                <p style="font-size:16px; line-height:24px;">
                Hi <b>${finalData.user.name}</b>, <br><br>
                Thank you for your order! Your order has been successfully placed and is now being processed.
                </p>

                <div style="background:#f1f5ff; padding:18px; border-radius:6px; margin:25px 0; font-size:15px;">

                <strong>Order ID:</strong> ${data._id} <br>
                <strong>Order Date:</strong> ${data.createdAt} <br>
                <strong>Payment Method:</strong> ${data.paymentMode}

                </div>

                <table width="100%" cellpadding="8" cellspacing="0" border="0" style="border-collapse:collapse; font-size:14px;">

                <tr style="background:#0a1f44; color:#ffffff;">
                <th align="left">Product</th>
                <th align="center">Qty</th>
                <th align="right">Price</th>
                </tr>

                </table>

                <p style="text-align:right; font-size:16px; margin-top:15px;">
                <strong>Total: ${data.total}</strong>
                </p>

                <div style="margin-top:25px; font-size:15px;">
                <strong style="color:#0a1f44;">Shipping Address:</strong><br>
                ${data.deliveryAddress}
                </div>

                <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:35px auto 10px;">
                <tr>
                <td style="background:#0a1f44; padding:14px 32px; border-radius:5px;">
                <a href="${process.env.SITE_URL}/profile?option=Order" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                Track Your Order
                </a>
                </td>
                </tr>
                </table>

                <p style="font-size:14px; color:#777777; text-align:center;">
                We’ll notify you once your order is shipped 🚚
                </p>

                </td>
                </tr>

                <tr>
                <td style="background:#f1f5ff; text-align:center; padding:20px; font-size:13px; color:#555555;">
                © 2026 ${process.env.SITE_NAME}. All rights reserved. <br>
                Need help? Contact our support anytime.
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
    let errorMessage = Object.fromEntries(
      Object.keys(error?.errors).map((key) => [key, error.errors[key].message]),
    );

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
    let data = await Checkout.find()
      .populate("user", ["name", "username"])
      .populate({
        path: "products.product",
        select: "name brand finalPrice stockQuantity stock pic",
        populate: {
          path: "brand",
          select: "-_id name",
        },
        options: {
          slice: {
            pic: 1,
          },
        },
      })
      .sort({ _id: -1 });
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

async function getUserRecord(req, res) {
  try {
    let data = await Checkout.find({user:req.params.userid})
      .populate("user", ["name", "username"])
      .populate({
        path: "products.product",
        select: "name brand finalPrice stockQuantity stock pic",
        populate: {
          path: "brand",
          select: "-_id name",
        },
        options: {
          slice: {
            pic: 1,
          },
        },
      })
      .sort({ _id: -1 });
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
    let data = await Checkout.findOne({ _id: req.params._id })
      .populate("user", ["name", "username"])
      .populate({
        path: "products.product",
        select: "name brand finalPrice stockQuantity stock pic",
        populate: {
          path: "brand",
          select: "-_id name",
        },
        options: {
          slice: {
            pic: 1,
          },
        },
      });
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
    let data = await Checkout.findOne({ _id: req.params._id });
    if (data) {
      data.orderStatus = req.body.orderStatus ?? data.orderStatus;
      data.paymentMode = req.body.paymentMode ?? data.paymentMode;
      data.paymentStatus = req.body.paymentStatus ?? data.paymentStatus;
      data.rppid = req.body.rppid ?? data.rppid;

      await data.save();

      let finalData = await Checkout.findOne({ _id: data._id })
        .populate("user", ["name", "username"])
        .populate({
          path: "products.product",
          select: "name brand finalPrice stockQuantity stock pic",
          populate: {
            path: "brand",
            select: "-_id name",
          },
          options: {
            slice: {
              pic: 1,
            },
          },
        });

      res.send({
        result: "Done",
        data: finalData,
      });
      mailer.sendMail(
        {
          from: process.env.MAILER,
          to: data.deliveryAddress?.email,
          subject: `Your Order Status Has Been Updated : Team ${process.env.SITE_NAME}`,
          html: `
                <tr>
                <td style="background:#0a1f44; color:#ffffff; text-align:center; padding:22px; font-size:26px; font-weight:bold;">
                ${process.env.SITE_NAME}
                </td>
                </tr>

                <tr>
                <td style="padding:40px 30px; color:#333333;">

                <h2 style="color:#0a1f44; margin-top:0;">📦 Order Status Updated</h2>

                <p style="font-size:16px; line-height:24px;">
                Hi <b>${finalData.user.name}</b>, <br><br>
                Your order status has been updated. Here are the latest details:
                </p>

                <div style="background:#f1f5ff; padding:20px; border-radius:6px; margin:25px 0; text-align:center;">

                <p style="margin:0; font-size:14px;">Order ID</p>
                <p style="margin:5px 0 15px 0; font-size:18px; font-weight:bold;">${data._id}</p>

                <span style="display:inline-block; background:#0a1f44; color:#ffffff; padding:10px 22px; border-radius:20px; font-size:14px; font-weight:bold;">
                ${data.orderStatus}
                </span>

                </div>

                <p style="font-size:15px; line-height:22px;">
                ${data.updatedAt}
                </p>

                <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto;">
                <tr>
                <td style="background:#0a1f44; padding:14px 32px; border-radius:5px;">
                <a href="${process.env.SITE_URL}/profile?option=Order" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                Track Your Order
                </a>
                </td>
                </tr>
                </table>

                <p style="font-size:14px; color:#777777; text-align:center;">
                If you have any questions, feel free to contact our support team.
                </p>

                </td>
                </tr>

                <tr>
                <td style="background:#f1f5ff; text-align:center; padding:20px; font-size:13px; color:#555555;">
                © 2026 ${process.env.SITE_NAME}. All rights reserved. <br>
                Thank you for shopping with us 💙
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
    } else {
      res.status(404).send({
        result: "Fail",
        reason: "Record Not Found",
      });
    }
  } catch (error) {
    let errorMessage = Object.fromEntries(
      Object.keys(error?.errors).map((key) => [key, error.errors[key].message]),
    );

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
    let data = await Checkout.findOne({ _id: req.params._id });
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
  getUserRecord: getUserRecord,
  getSingleRecord: getSingleRecord,
  updateRecord: updateRecord,
  deleteRecord: deleteRecord,
};

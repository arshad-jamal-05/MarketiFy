const Product = require("../models/Product");
const Newsletter = require("../models/Newsletter");
const mailer = require("../mailer/index");
const fs = require("fs");

async function createRecord(req, res) {
  try {
    let data = new Product(req.body);
    if (req.files) {
      data.pic = Array.from(req.files).map((x) => x.path);
    }
    await data.save();

    let finalData = await Product.findOne({ _id: data._id })
      .populate("maincategory", ["name", "pic"])
      .populate("subcategory", ["name", "pic"])
      .populate("brand", ["name", "pic"]);

    res.send({
      result: "Done",
      data: finalData,
    });
    let newsletter = await Newsletter.find();
    newsletter.forEach((item) => {
      mailer.sendMail(
        {
          from: process.env.MAILER,
          to: item.email,
          subject: `Exciting New Arrival Just For You : Team ${process.env.SITE_NAME}`,
          html: `
                  <tr>
                  <td style="background:#13c5dd; color:#ffffff; text-align:center; padding:22px; font-size:26px; font-weight:bold;">
                  MarketiFy
                  </td>
                  </tr>

                  <tr>
                  <td style="padding:40px 30px; color:#333333; text-align:center;">

                  <h2 style="color:#13c5dd; margin-top:0;">🎉 New Product Just Launched!</h2>

                  <p style="font-size:16px; line-height:24px;">
                  Dear Customer, <br><br>
                  We’re excited to introduce our latest product <b>${productName}</b>.  
                  Be among the first to explore it and enjoy an amazing shopping experience.
                  </p>

                  <img src="${productImage}" alt="product" width="250"
                  style="margin:20px 0; border-radius:8px;">

                  <div style="background:#f1f5ff; padding:18px; border-radius:6px; margin:25px 0; font-size:15px;">
                  <strong>✨ ${productName}</strong><br><br>
                  ${productDescription}
                  <br><br>
                  <strong>Price:</strong> ${productPrice}
                  </div>

                  <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto;">
                  <tr>
                  <td style="background:#13c5dd; padding:14px 32px; border-radius:5px;">
                  <a href="${process.env.SITE_URL}/product/${data._id}" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                  Shop Now
                  </a>
                  </td>
                  </tr>
                  </table>

                  <p style="font-size:14px; color:#777777;">
                  Hurry! This product is trending and may sell out soon.
                  </p>

                  </td>
                  </tr>

                  <tr>
                  <td style="background:#f1f5ff; text-align:center; padding:20px; font-size:13px; color:#555555;">
                  © 2026 ${process.env.SITE_NAME}. All rights reserved. <br>
                  You’re receiving this email because you subscribed to our updates.
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
    });
  } catch (error) {
    console.log(error);
    if (req.files) {
      try {
        fs.unlinkSync(req.files.path);
      } catch (error) {
        console.log(error);
      }
    }

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
    let data = await Product.find()
      .populate("maincategory", ["name", "pic"])
      .populate("subcategory", ["name", "pic"])
      .populate("brand", ["name", "pic"])
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
    let data = await Product.findOne({ _id: req.params._id })
      .populate("maincategory", ["name", "pic"])
      .populate("subcategory", ["name", "pic"])
      .populate("brand", ["name", "pic"]);
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
    let data = await Product.findOne({ _id: req.params._id });
    console.log(req.body, data);
    if (data) {
      if (req.body.option) {
        data.stock = req.body.stock ?? data.stock;
        data.stockQuantity = req.body.stockQuantity ?? data.stockQuantity;
        await data.save();
      } else {
        data.name = req.body.name ?? data.name;
        data.maincategory = req.body.maincategory ?? data.maincategory;
        data.subcategory = req.body.subcategory ?? data.subcategory;
        data.brand = req.body.brand ?? data.brand;
        data.color = req.body.color ?? data.color;
        data.size = req.body.size ?? data.size;
        data.basePrice = req.body.basePrice ?? data.basePrice;
        data.discount = req.body.discount ?? data.discount;
        data.finalPrice = req.body.finalPrice ?? data.finalPrice;
        data.stockQuantity = req.body.stockQuantity ?? data.stockQuantity;
        data.description = req.body.description ?? data.description;
        data.status = req.body.status ?? data.status;

        await data.save();

        if ((await data.save()) && req.files) {
          data.pic.forEach((x, index) => {
            if (!req.body.oldPics?.includes(x)) {
              fs.unlinkSync(x, (error) => {});
              data.pic.splice(index, 1);
            }
          });

          if (typeof req.body.oldPics === "undefined") {
            data.pic = Array.from(req.files).map((x) => x.path);
          } else {
            data.pic = req.body.oldPics?.concat(
              Array.from(req.files).map((x) => x.path),
            );
          }
          await data.save();
        }
      }

      let finalData = await Product.findOne({ _id: data._id })
        .populate("maincategory", ["name", "pic"])
        .populate("subcategory", ["name", "pic"])
        .populate("brand", ["name", "pic"]);

      res.send({
        result: "Done",
        data: finalData,
      });
    } else {
      res.status(404).send({
        result: "Fail",
        reason: "Record Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    if (req.files) {
      Array.from(req.files).forEach((file) => {
        try {
          fs.unlinkSync(file.path);
        } catch (error) {
          console.log(error);
        }
      });
    }

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
    let data = await Product.findOne({ _id: req.params._id });
    if (data) {
      data.pic.forEach((file) => {
        try {
          fs.unlinkSync(file);
        } catch (error) {}
      });
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

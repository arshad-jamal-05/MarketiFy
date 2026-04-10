const User = require("../models/User");
const passwordValidator = require("password-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailer = require("../mailer/index");

const schema = new passwordValidator();

schema
  .is()
  .min(8) // Minimum length 8
  .is()
  .max(50) // Maximum length 50
  .has()
  .uppercase(1) // Must have at least 1 uppercase letters
  .has()
  .lowercase(1) // Must have at least 1 lowercase letters
  .has()
  .digits(1) // Must have at least 1 digits
  .has()
  .symbols(1) // Must have at least 1 special character or symbols
  .has()
  .not()
  .spaces() // Should not have spaces
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // Blacklist these values

async function createRecord(req, res) {
  if (req.body.password) {
    if (schema.validate(req.body.password)) {
      bcrypt.hash(req.body.password, 12, async (error, hash) => {
        if (error) {
          return res.send({
            result: "Fail",
            reason: "Internal Server Error During Password Encryption",
          });
        } else {
          try {
            let data = new User(req.body);
            if (!req.body.option) {
              data.role = "Buyer";
            }
            // data.role = "Buyer";
            data.password = hash;
            await data.save();
            res.send({
              result: "Done",
              data: data,
            });
            mailer.sendMail(
              {
                from: process.env.MAILER,
                to: data.email,
                subject: `Welcome to ${process.env.SITE_NAME} : SignUp Successful`,
                html: `
                      <tr>
                      <td style="background:#13c5dd; color:#ffffff; text-align:center; padding:22px; font-size:26px; font-weight:bold;">
                      ${process.env.SITE_NAME}
                      </td>
                      </tr>

                      <tr>
                      <td style="padding:40px 30px; color:#333333;">

                      <h2 style="color:#13c5dd; margin-top:0;">Welcome to ${process.env.SITE_NAME} 🎉</h2>

                      <p style="font-size:16px; line-height:24px;">
                      Hi <b>${data.name}</b>, <br><br>
                      Your account has been successfully created. We’re excited to have you with us.
                      Now you can explore products, enjoy exclusive offers, and experience seamless shopping.
                      </p>

                      <div style="background:#f1f5ff; padding:18px; border-radius:6px; margin:25px 0; font-size:15px;">
                      ✔ Secure and fast checkout <br>
                      ✔ Easy order tracking <br>
                      ✔ Wishlist & save for later <br>
                      ✔ Exclusive member discounts
                      </div>

                      <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto;">
                      <tr>
                      <td style="background:#13c5dd; padding:14px 32px; border-radius:5px;">
                      <a href="${process.env.SITE_URL}" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                      Start Shopping
                      </a>
                      </td>
                      </tr>
                      </table>

                      <p style="font-size:14px; color:#777777; text-align:center;">
                      If you did not create this account, please contact our support team immediately.
                      </p>

                      </td>
                      </tr>

                      <tr>
                      <td style="background:#f1f5ff; text-align:center; padding:20px; font-size:13px; color:#555555;">
                      © 2026 Marketify. All rights reserved. <br>
                      Thank you for choosing us ❤️
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
                `${key} is Already Taken`,
              ]);
            } else {
              err = Object.keys(error?.errors).map((key) => [
                key,
                error.errors[key].message.replaceAll("string", "Password"),
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
      });
    } else {
      res.send({
        result: "Fail",
        reason: schema
          .validate(req.body.password, { details: true })
          .map((x) => x.message),
      });
    }
  } else {
    res.send({
      result: "Fail",
      reason: "Password is Required",
    });
  }
}

async function getRecord(req, res) {
  try {
    let data = await User.find().sort({ _id: -1 });
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
    let data = await User.findOne({ _id: req.params._id });
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
    let data = await User.findOne({ _id: req.params._id });
    if (data) {
      data.name = req.body.name ?? data.name;
      data.username = req.body.username ?? data.username;
      data.email = req.body.email ?? data.email;
      data.phone = req.body.phone ?? data.phone;
      data.role = req.body.role ?? data.role;
      data.address = req.body.address ?? data.address;
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
    let err = [];
    if (error?.keyValue) {
      err = Object.keys(error?.keyValue).map((key) => [
        key,
        `${key} is Already Taken`,
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

async function deleteRecord(req, res) {
  try {
    let data = await User.findOne({ _id: req.params._id });
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

async function login(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (data && (await bcrypt.compare(req.body.password, data.password))) {
      // let key =
      //   data.role === "Buyer"
      //     ? process.env.JWT_SECRET_KEY_BUYER
      //     : data.role === "Admin"
      //       ? process.env.JWT_SECRET_KEY_ADMIN
      //       : process.env.JWT_SECRET_KEY_SUPER_ADMIN;
      jwt.sign(
        { data },
        process.env.JWT_SECRET_KEY_PRIVATE,
        { expiresIn: "15 days" },
        (error, token) => {
          if (error) {
            res.status(500).send({
              result: "Fail",
              reason: "Internal Server Error",
            });
          } else {
            res.send({
              result: "Done",
              data: data,
              token: token,
            });
          }
        },
      );
    } else {
      res.status(401).send({
        result: "Fail",
        reason: "Invalid Credentials",
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

async function forgetPassword1(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (data) {
      let otp = Math.random().toString().slice(2, 8);
      data.otpAuthObject = {
        otp: otp,
        createdAt: new Date(),
      };

      await data.save();

      res.send({
        result: "Done",
        message: "OTP Has Been Sent On Your Registered Email Address",
      });

      mailer.sendMail(
        {
          from: process.env.MAILER,
          to: data.email,
          subject: `OTP for Password Reset : Team ${process.env.SITE_NAME}`,
          html: `
          
          <tr>
            <td style="background-color:#13c5dd; padding:20px; text-align:center; color:#ffffff; font-size:24px; font-weight:bold;">
              ${process.env.SITE_NAME}
            </td>
          </tr>

         
          <tr>
            <td style="padding:40px 30px; color:#333333;">

              <h2 style="margin-top:0; color:#13c5dd;">Password Reset Request</h2>

              <p style="font-size:16px; line-height:24px;">
                We received a request to reset your password. Use the One Time Password (OTP) below to proceed.
              </p>

              
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:30px 0;">
                <tr>
                  <td align="center">
                    <div style="display:inline-block; background-color:#f1f5ff; color:#13c5dd; font-size:32px; letter-spacing:8px; font-weight:bold; padding:15px 25px; border-radius:6px;">
                      ${otp}
                    </div>
                  </td>
                </tr>
              </table>

              <p style="font-size:15px; line-height:22px;">
                This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone for security reasons.
              </p>

              <p style="font-size:15px; line-height:22px;">
                If you did not request a password reset, you can safely ignore this email.
              </p>

             
              <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin:30px auto 10px;">
                <tr>
                  <td align="center" style="background-color:#13c5dd; padding:14px 30px; border-radius:5px;">
                    <a href="#" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          
          <tr>
            <td style="background-color:#f1f5ff; padding:20px; text-align:center; font-size:13px; color:#555555;">
              © 2026 Marketify. All rights reserved.<br>
              Need help? Contact our support team.
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
      res.status(401).send({
        result: "Fail",
        reason: "User Not Found",
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

async function forgetPassword2(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (data) {
      if (
        data.otpAuthObject.otp == req.body.otp &&
        new Date() - new Date(data.otpAuthObject.createdAt) < 1000 * 60 * 10
      ) {
        res.send({
          result: "Done",
        });
      } else {
        res.status(400).send({
          result: "Fail",
          reason: "Invalid OTP or OTP Has Been Expired",
        });
      }
    } else {
      res.status(401).send({
        result: "Fail",
        reason: "Unauthorized Activity",
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

async function forgetPassword3(req, res) {
  try {
    let data = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.username }],
    });
    if (data) {
      if (schema.validate(req.body.password)) {
        bcrypt.hash(req.body.password, 12, async (error, hash) => {
          if (error) {
            res.status(500).send({
              result: "Fail",
              reason: "Internal Server Error During Password Encryption",
            });
          } else {
            data.password = hash;
            await data.save();
            res.send({
              result: "Done",
              data: data,
              message: "Password Has Been Changed Successfully",
            });
          }
        });
      } else {
        res.status(400).send({
          result: "Fail",
          reason: schema
            .validate(req.body.password, { details: true })
            .map((x) => x.message),
        });
      }
    } else {
      res.status(401).send({
        result: "Fail",
        reason: "Unauthorized Activity",
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
  login: login,
  forgetPassword1: forgetPassword1,
  forgetPassword2: forgetPassword2,
  forgetPassword3: forgetPassword3,
};

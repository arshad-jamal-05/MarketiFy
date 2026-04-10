const ContactUs = require("../models/ContactUs");
const mailer = require("../mailer/index");

async function createRecord(req, res) {
  try {
    let data = new ContactUs(req.body);
    await data.save();
    res.send({
      result: "Done",
      data: data,
    });
    mailer.sendMail(
      {
        from: process.env.MAILER,
        to: process.env.MAILER,
        subject: `New ContactUs Query Recieved : Team ${process.env.SITE_NAME}`,
        html: `
                      <tr>
                      <td style="background:#13c5dd; color:#ffffff; padding:20px; font-size:24px; font-weight:bold; text-align:center;">
                      ${process.env.SITE_NAME} – Contact Query
                      </td>
                      </tr>
                            
                      <tr>
                      <td style="padding:35px 30px; color:#333333;">
                            
                      <h2 style="color:#13c5dd; margin-top:0;">New Message Received 📩</h2>
                            
                      <p style="font-size:16px;">
                      You have received a new contact form submission. Here are the details:
                      </p>
                            
                      <table width="100%" cellpadding="8" cellspacing="0" border="0" style="background:#f1f5ff; border-radius:6px; margin-top:20px; font-size:15px;">
                            
                      <tr>
                      <td style="font-weight:bold; width:140px;">Name:</td>
                      <td>${data.name}</td>
                      </tr>
                            
                      <tr>
                      <td style="font-weight:bold; width:140px;">Phone:</td>
                      <td>${data.phone}</td>
                      </tr>
                            
                      <tr>
                      <td style="font-weight:bold;">Email:</td>
                      <td>${data.email}</td>
                      </tr>
                            
                      <tr>
                      <td style="font-weight:bold;">Subject:</td>
                      <td>${data.subject}</td>
                      </tr>
                            
                      <tr>
                      <td style="font-weight:bold;">Message:</td>
                      <td>${data.message}</td>
                      </tr>
                            
                      </table>
                            
                      <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto 10px;">
                      <tr>
                      <td style="background:#13c5dd; padding:12px 28px; border-radius:5px;">
                      <a href="mailto:${data.email}" style="color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold;">
                      Reply to Customer
                      </a>
                      </td>
                      </tr>
                      </table>
                            
                      </td>
                      </tr>
                            
                      <tr>
                      <td style="background:#f1f5ff; text-align:center; padding:18px; font-size:13px; color:#555555;">
                      This is an automated notification from your website contact form.
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
    mailer.sendMail(
      {
        from: process.env.MAILER,
        to: data.email,
        subject: `We Have Received Your Query : Team ${process.env.SITE_NAME}`,
        html: `
                      <tr>
                      <td style="background:#13c5dd; color:#ffffff; text-align:center; padding:22px; font-size:24px; font-weight:bold;">
                      ${process.env.SITE_NAME}
                      </td>
                      </tr>

                      <tr>
                      <td style="padding:40px 30px; color:#333333;">

                      <h2 style="color:#13c5dd; margin-top:0;">We’ve Received Your Message ✅</h2>

                      <p style="font-size:16px; line-height:24px;">
                      Hi <b>${data.name}</b>,
                      <br><br>
                      Thank you for contacting us. Your query has been successfully received. Our support team is currently reviewing your message and will get back to you as soon as possible.
                      </p>

                      <div style="background:#f1f5ff; padding:18px; border-radius:6px; margin:25px 0; font-size:15px;">
                      <strong>Your Message:</strong><br><br>
                      ${data.message}
                      </div>

                      <p style="font-size:15px; line-height:22px;">
                      We usually respond within <b>24 hours</b>. Meanwhile, you can explore our latest products and exclusive offers.
                      </p>

                      <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto;">
                      <tr>
                      <td style="background:#13c5dd; padding:14px 30px; border-radius:5px;">
                      <a href="${process.env.SITE_URL}" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                      Continue Shopping
                      </a>
                      </td>
                      </tr>
                      </table>

                      <p style="font-size:14px; color:#777777; text-align:center;">
                      This is an automated response. Please do not reply to this email.
                      </p>

                      </td>
                      </tr>

                      <tr>
                      <td style="background:#f1f5ff; text-align:center; padding:20px; font-size:13px; color:#555555;">
                      © 2026 Marketify. All rights reserved. <br>
                      We appreciate your patience 💙
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
    let data = await ContactUs.find().sort({ _id: -1 });
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
    let data = await ContactUs.findOne({ _id: req.params._id });
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
    let data = await ContactUs.findOne({ _id: req.params._id });
    if (data) {
      data.status = req.body.status ?? data.status;

      await data.save();

      res.send({
        result: "Done",
        data: data,
      });

      mailer.sendMail(
        {
          from: process.env.MAILER,
          to: data.email,
          subject: `Your Query Has Been Resolved : Team ${process.env.SITE_NAME}`,
          html: `
                    <tr>
                    <td style="background:#13c5dd; color:#ffffff; text-align:center; padding:22px; font-size:24px; font-weight:bold;">
                    Marketify Support
                    </td>
                    </tr>

                    <tr>
                    <td style="padding:40px 30px; color:#333333;">

                    <h2 style="color:#13c5dd; margin-top:0;">Your Issue Has Been Resolved ✅</h2>

                    <p style="font-size:16px; line-height:24px;">
                    Hi <b>${data.name}</b>,
                    <br><br>
                    We’re happy to inform you that your recent query has been successfully resolved by our support team. Your satisfaction is our top priority.
                    </p>

                    <p style="font-size:15px; line-height:22px;">
                    If you still have any questions or need further assistance, feel free to reply to this email or contact our support team anytime.
                    </p>

                    <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto;">
                    <tr>
                    <td style="background:#13c5dd; padding:14px 30px; border-radius:5px;">
                    <a href="${process.env.SITE_URL}" style="color:#ffffff; text-decoration:none; font-size:16px; font-weight:bold;">
                    Contact Support
                    </a>
                    </td>
                    </tr>
                    </table>

                    <p style="font-size:14px; color:#777777; text-align:center;">
                    Thank you for your patience and for choosing ${process.env.SITE_NAME} 💙
                    </p>

                    </td>
                    </tr>

                    <tr>
                    <td style="background:#f1f5ff; text-align:center; padding:20px; font-size:13px; color:#555555;">
                    © 2026 ${process.env.SITE_NAME}. All rights reserved. <br>
                    This is an automated service email.
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
    console.log(error);

    let errorMessage = {};
    error?.keyValue && error?.keyValue?.question
      ? (errorMessage.question = "ContactUs Question is Already Exist")
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
    let data = await ContactUs.findOne({ _id: req.params._id });
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

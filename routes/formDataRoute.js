// for form data routes
const express = require("express");
const form = require("../controllers/formDataController.js");
const upload = require("../utils/multer");
const formData = require("../models/formDataModel.js");

const formDataRouter = express.Router();

require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const fs = require("fs");
const Hogan = require("hogan.js");

const template = fs.readFileSync("./routes/index2.hjs", "utf-8");
const compiledTemplate = Hogan.compile(template);

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,

    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

formDataRouter.route("/formData").post(form.postFormData);
formDataRouter.route("/formData").get(form.getFormData);
formDataRouter.route("/formDataById/:id").get(form.getFormDataByID);

formDataRouter.route("/formData/photo/:id").post(upload("image").single("file"), async (req, res, next) => {
  // const url = `${req.protocol}://${req.get("host")}`;
  // const url = "http://3.88.157.171:8080";
  const url = "http://54.83.101.192:8080";
  const { file } = req;
  const formId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const form = await formData.findById(formId);
    console.log("here is form", form);
    if (!form) return res.sendStatus(404);
    form.designImage = `${url}/${file.path}`;
    const result = await form.save();
    console.log(result);
    if (result) {
      const message2 = {
        from: {
          name: "Tina Rosario Website",
          address: "design@tinarosario.com",
        },
        to: "design@tinarosario.com",
        subject: "Got a new order",
        text: `Got a new order with follwoing data: \n
      OrderId:${result.OrderId} \n
      Category: ${result.category}\n
      Name: ${result.name} \n
      email: ${result.email}\n
      contact:${result.contact} \n
      Note: ${result.note}\n
      gender: ${result?.gender} \n
      fabric: ${result?.fabric}\n
      wedding day: ${result?.dday}\n
      appointDate: ${result?.appointDate}\n
      ageCategory: ${result?.ageCategory}\n
      typeOfAttire: ${result?.typeOfAttire}\n
      ownDesign: ${result?.ownDesign}\n
      Consulting Perference: ${result?.consPre}\n
      Image: ${result?.designImage}\n
      `,
      };

      transporter.sendMail(message2, function (err, data) {
        if (err) {
          console.log(err);
          res.status(200).json({ status: false, message: "ERROR while sending mail" });
        } else {
          console.log("email sent to Tina");
          res.json({ status: true, message: "Email sent" });
        }
      });
    }
    const message1 = {
      from: {
        name: "Tina Rosario",
        address: "design@tinarosario.com",
      },
      to: result.email,
      subject: "Thank you for contacting The Design House by Tina Rosario",
      html: compiledTemplate.render({ userName: result.name }),
    };
    transporter.sendMail(message1, function (err, data) {
      if (err) {
        console.log(err);
        res.status(400).json({ status: false, message: "ERROR while sending mail" });
      } else {
        console.log("email sent to user");

        res.json({ status: true, message: "Email sent to user" });
      }
    });

    res.send({ form, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
});

module.exports = formDataRouter;

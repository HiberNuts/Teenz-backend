const express = require("express");
const EmailTemplate = require("email-templates");
const path = require("path");
const fs = require("fs");
const Hogan = require("hogan.js");

require("dotenv").config();
const sendMailRouter = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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

sendMailRouter.post("/mail", (req, res) => {
  const data = req.body;

  const message = {
    from: data.from,
    to: "design@tinarosario.com",
    subject: `Contact from ${data.from}`,
    text: data.text,
  };

  transporter.sendMail(message, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).json({ status: false, message: "ERROR while sending mail" });
    } else {
      console.log("email sent to Tina");
      res.json({ status: true, message: "Email sent to tina" });
    }
  });
  const message2 = {
    from: "design@tinarosario.com",
    to: data.from,
    subject: "Thank you for contacting The Design House by Tina Rosario",
    text: data.text,
    html: compiledTemplate.render({ userName: data.userName }),
  };
  transporter.sendMail(message2, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).json({ status: false, message: "ERROR while sending mail" });
    } else {
      console.log("email sent to User");
      res.json({ status: true, message: "Email sent to user" });
    }
  });
});

module.exports = sendMailRouter;

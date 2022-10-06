const express = require("express");

const sendMailRouter = express.Router();
require("dotenv").config();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

// let mailOptions = {
//   // from: "raghavjindal0212@gmail.com",
//   from: "ragh.20fit34@gct.ac.in",
//   to: "lovlyraghav1@gmail.com",
//   subject: "Tina rosario project",
//   text: "Hi from your nodemailer project",
// };

sendMailRouter.post("/mail", (req, res) => {
  const data = req.body;
  const message = {
    from: data.from,
    to: data.to,
    subject: data.subject,
    text: data.text,
  };

  transporter.sendMail(message, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).json({ status: false, message: "ERROR while sending mail" });
    } else {
      res.json({ status: true, message: "Email sent" });
    }
  });
});

module.exports = sendMailRouter;

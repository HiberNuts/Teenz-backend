const express = require("express");
const EmailTemplate = require("email-templates");
const path = require("path");
const fs = require("fs");

require("dotenv").config();
const sendMailRouter = express.Router();
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

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

// let mailOptions = {
//   // from: "raghavjindal0212@gmail.com",
//   from: "ragh.20fit34@gct.ac.in",
//   to: "lovlyraghav1@gmail.com",
//   subject: "Tina rosario project",
//   text: "Hi from your nodemailer project",
// };

sendMailRouter.post("/mail", (req, res) => {
  const data = req.body;
  const htmlStream = fs.createReadStream("routes/index.html");
  // const message = {
  //   from: data.from,
  //   to: data.to,
  //   subject: data.subject,
  //   text: data.text,
  // };

  // transporter.sendMail(message, function (err, data) {
  //   if (err) {
  //     console.log(err);
  //     res.status(400).json({ status: false, message: "ERROR while sending mail" });
  //   } else {
  //     res.json({ status: true, message: "Email sent to tina" });
  //   }
  // });
  const templateDir = "../mailhtml/index.ejs";
  const testMailTemplate = new EmailTemplate();
  const locals = {
    userName: "XYZ", //dynamic data for bind into the template
  };
  const message2 = {
    from: data.to,
    to: data.from,
    subject: data.subject,
    text: data.text,
    html: htmlStream,
  };

  // testMailTemplate.render("../mailhtml/index.ejs", locals, function (err, temp) {
  //   if (err) {
  //     console.log("error", err);
  //   } else {
  //     transporter.sendMail(
  //       {
  //         from: data.to,
  //         to: data.from,
  //         subject: "test mail",
  //         text: temp.ejs,
  //         html: temp.ejs,
  //       },
  //       function (error, info) {
  //         if (error) {
  //           console.log(error);
  //         }
  //         console.log("Message sent: " + info.response);
  //       }
  //     );
  //   }
  // });

  transporter.sendMail(message2, function (err, data) {
    if (err) {
      console.log(err);
      res.status(400).json({ status: false, message: "ERROR while sending mail" });
    } else {
      res.json({ status: true, message: "Email sent to user" });
    }
  });
});

module.exports = sendMailRouter;

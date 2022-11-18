const feedbackData = require("../models/feedbackDataModel.js");

const express = require("express");

const sendMailRouter = express.Router();
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

const postFeedbackData = async (req, res) => {
  try {
    //creating id logic

    const data = req.body;
    const result = await feedbackData.create(data);

    if (result) {
      res.json(result);
      if (result.image !== "yes") {
        const message2 = {
          from: {
            name: "Tina Rosario Website",
            address: "design@tinarosario.com",
          },
          to: "design@tinarosario.com",
          subject: "Received a new feedback",
          text: `Data: \n
            \n
            Name: ${result.name}
            \n
            Email: ${result.email}
            \n
            Feedback:${result.feedback}
            \n
            Rating\n
            design:${result.design}\n
            creativity:${result.creativity}\n
            fit:${result.fit}\n
            quality:${result.quality}\n
            timeline:${result.timeline}\n
            response:${result.response}\n
            overall:${result.overall}\n
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

      // res.json({ status: true });
    }
  } catch (error) {
    res.json({ status: false });
    console.error(`Error in posting the feedback Datas ${error}`);
  }
};

const getFeedbackData = async (req, res) => {
  try {
    const result = await feedbackData.find({});
    res.json(result);
  } catch (error) {
    res.json({ status: false });
    console.error(`Error in getting the form Datas ${error}`);
  }
};

module.exports = { getFeedbackData, postFeedbackData };

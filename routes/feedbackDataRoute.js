// for form data routes
const express = require("express");
const feedback = require("../controllers/feedbackDataController.js");
const upload = require("../utils/multer");
const feedbackData = require("../models/feedbackDataModel.js");

const feedbackRouter = express.Router();

require("dotenv").config();
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

feedbackRouter.route("/feedback").post(feedback.postFeedbackData);
feedbackRouter.route("/feedback").get(feedback.getFeedbackData);

feedbackRouter.route("/feedback/photo/:id").post(upload("feedback").single("file"), async (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const { file } = req;
  const feedbackID = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const feedback = await feedbackData.findById(feedbackID);
    console.log("here is form", feedback);
    if (!feedback) return res.sendStatus(404);
    feedback.image = `${url}/${file.path}`;
    const result = await feedback.save();
    console.log(result);
    if (result) {
      const message2 = {
        from: "design@tinarosario.com",
        to: "design@tinarosario.com",
        subject: "Received a new feedback",
        text: `Data : \n
      name:${result.name} \n
      email: ${result.email}\n
      feedback: ${result.feedback} \n
      email: ${result.email}\n
      design:${result.design} \n
      creativity: ${result.creativity}\n
      fit: ${result?.fit} \n
      quality: ${result?.quality}\n
      timeline: ${result?.timeline}\n
      response: ${result?.response}\n
      overall: ${result?.overall}\n
      image: ${result?.image}
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

    res.send({ feedback, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
});

module.exports = feedbackRouter;

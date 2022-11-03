const productData = require("../models/productDataModel.js");

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

const postProductData = async (req, res) => {
  try {
    //creating id logic

    const data = req.body;
    const result = await productData.create(data);

    if (result) {
      console.log(result);
      // res.json({ status: true });
      res.json(result);
    //   if (result?.ownDesign != "true") {
    //     const message1 = {
    //       from: "raghavjindal0212@gmail.com",
    //       to: result.email,
    //       subject: "Thankyou for contacting The Design House",

    //       html: compiledTemplate.render({ userName: result.name }),
    //     };
    //     transporter.sendMail(message1, function (err, data) {
    //       if (err) {
    //         console.log(err);
    //         res.status(400).json({ status: false, message: "ERROR while sending mail" });
    //       } else {
    //         console.log("email sent to User");
    //         res.json({ status: true, message: "Email sent to user" });
    //       }
    //     });

       
    //   }
    }
  } catch (error) {
    res.json({ status: false });
    console.error(`Error in posting the form Datas ${error}`);
  }
};

const getProductData = async (req, res) => {
  try {
    const result = await productData.find({});
    res.json(result);
  } catch (error) {
    res.json({ status: false });
    console.error(`Error in getting the form Datas ${error}`);
  }
};

// const getFormDataByID = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const result = await formData.findById(id);
//     res.json(result);
//   } catch (error) {
//     res.json({ status: false });
//     console.error(`Error in getting the form Datas ${error}`);
//   }
// };

module.exports = { postProductData, getProductData };
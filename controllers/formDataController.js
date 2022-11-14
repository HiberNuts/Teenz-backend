const formData = require("../models/formDataModel.js");
const generateUniqueId = require("generate-unique-id");
const mongoose = require("mongoose");
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

const postFormData = async (req, res) => {
  try {
    //creating id logic

    const data = req.body;
    const uid = generateUniqueId({
      length: 4,
      useLetters: false,
      useNumbers: true,
    });
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().slice(-2);
    var finalId = "";
    if (data.category.toLowerCase().includes("wedding")) {
      finalId = `WC${uid}${month}${year}`;
    } else if (data.category.toLowerCase().includes("customized")) {
      finalId = `CD${uid}${month}${year}`;
    } else if (data.category.toLowerCase().includes("image")) {
      finalId = `IC${uid}${month}${year}`;
    } else if (data.category.toLowerCase().includes("pamper")) {
      finalId = `GP${uid}${month}${year}`;
    }
    let text = "";
    if (data.category.toLowerCase().includes("wedding")) {
      text = "Wedding";
    } else if (data.category.toLowerCase().includes("customized")) {
      text = "Customized design";
    } else if (data.category.toLowerCase().includes("image")) {
      text = "Image consulting";
    } else if (data.category.toLowerCase().includes("pamper")) {
      text = "Get pampered";
    }

    const result = await formData.create({ OrderId: finalId, ...data });

    if (result) {
      console.log(result);
      // res.json({ status: true });
      res.json(result);
      if (result?.ownDesign != "true") {
        const message1 = {
          from: "raghavjindal0212@gmail.com",
          to: result.email,
          subject: "Thankyou for contacting The Design House",

          html: compiledTemplate.render({ userName: result.name }),
        };
        transporter.sendMail(message1, function (err, data) {
          if (err) {
            console.log(err);
            res.status(400).json({ status: false, message: "ERROR while sending mail" });
          } else {
            console.log("email sent to User");
            res.json({ status: true, message: "Email sent to user" });
          }
        });

        if (result.name) {
        }

        const message2 = {
          from: "raghavjindal0212@gmail.com",
          to: "design@tinarosario.com",
          subject: `${text} enquiry`,
          text: `Got a new order with follwoing data:\n\n${result.OrderId ? `OrderId: ${result.OrderId}\n` : ""}${
            result.category ? `Category: ${result.category}\n` : ""
          }${result.name ? `\nName: ${result.name}\n` : ""}${result.email ? `Email: ${result.email}\n` : ""}${
            result.contact ? `Contact: ${result.contact}\n` : ""
          }${result.note ? `Note: ${result.note}` : ""}${result.gender ? `Gender: ${result.gender}\n` : ""}${
            result.fabric ? `Fabric: ${result.fabric}\n` : ""
          }${result.dday ? `Wedding day: ${result.dday}` : ""}${
            result.appointDate ? `Appoint day: ${result.appointDate}\n` : ""
          }${result.ageCategory ? `Age Category: ${result.ageCategory}\n` : ""}${
            result.typeOfAttire ? `Type of attire: ${result.typeOfAttire}\n` : ""
          }${result.ownDesign ? `Own design: ${result.ownDesign}\n` : ""}${
            result.consPre ? `Consulting preference: ${result.consPre}\n` : ""
          }
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
    }
  } catch (error) {
    res.json({ status: false });
    console.error(`Error in posting the form Datas ${error}`);
  }
};

const getFormData = async (req, res) => {
  try {
    const result = await formData.find({});
    res.json(result);
  } catch (error) {
    res.json({ status: false });
    console.error(`Error in getting the form Datas ${error}`);
  }
};

const getFormDataByID = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await formData.findById(id);
    res.json(result);
  } catch (error) {
    res.json({ status: false });
    console.error(`Error in getting the form Datas ${error}`);
  }
};

module.exports = { postFormData, getFormData, getFormDataByID };

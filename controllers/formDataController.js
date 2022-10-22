const formData = require("../models/formDataModel.js");
const generateUniqueId = require("generate-unique-id");
const mongoose = require("mongoose");
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

    const result = await formData.create({ OrderId: finalId, ...data });

    if (result) {
      console.log(result);
      // res.json({ status: true });
      res.json(result);

      const message1 = {
        from: "design@tinarosario.com",
        to: result.email,
        subject: "Will get back to you shortly",
        text: "We will get back to you shortly, your request has been noted",
      };

      transporter.sendMail(message1, function (err, data) {
        if (err) {
          console.log(err);
          res.status(200).json({ status: false, message: "ERROR while sending mail" });
        } else {
          res.json({ status: true, message: "Email sent" });
        }
      });

      const message2 = {
        from: "raghavjindal0212@gmail.com",
        to: "design@tinarosario.com",
        subject: "Got a new order",
        text: `Got a new order with follwoing data ${result}`,
      };

      transporter.sendMail(message2, function (err, data) {
        if (err) {
          console.log(err);
          res.status(200).json({ status: false, message: "ERROR while sending mail" });
        } else {
          res.json({ status: true, message: "Email sent" });
        }
      });
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

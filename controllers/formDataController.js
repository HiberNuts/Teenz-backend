const formData = require("../models/formDataModel.js");
const generateUniqueId = require("generate-unique-id");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const date = new Date();
console.log(date.getMonth() + 1);
console.log(date.getFullYear().toString().slice(-2));

const postFormData = async (req, res) => {
  try {
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
    }
    const result = await formData.create({ OrderId: finalId, ...data });

    if (result) {
      console.log(result);
      // res.json({ status: true });
      res.json(result);
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

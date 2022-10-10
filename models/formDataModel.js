const mongoose = require("mongoose");
// const autoIncrement = require("mongoose-auto-increment");

// const dotenv = require("dotenv");

// dotenv.config();
// const uri = process.env.MONGO_URI;

// var connection = mongoose.createConnection(uri);
// autoIncrement.initialize(connection);

const formDataSchema = new mongoose.Schema(
  {
    OrderId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    contact: {
      type: String,
    },
    dDay: {
      type: String,
    },
    note: {
      type: String,
    },
    appointDate: {
      type: String,
    },
    gender: {
      type: String,
    },
    ageCategory: {
      type: Number,
    },
    typeOfAttire: {
      type: String,
    },
    fabric: {
      type: String,
    },
    designImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
// formDataSchema.plugin(autoIncrement.plugin, { model: "formData", field: "id", prefix: "WC" });

const formData = mongoose.model("formData", formDataSchema);

formDataSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = formData;

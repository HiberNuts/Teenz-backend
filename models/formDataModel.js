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
    gender: {
      type: String,
      required: true,
    },
    fabric: {
      type: String,
      required: true,
    },
    clothingChoice: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
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

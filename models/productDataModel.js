const mongoose = require("mongoose");

const productDataSchema = new mongoose.Schema(
  {
    productName: {
      type: "string",
    },
    name: {
      type: "string",
    },
    contact: {
      type: "string",
    },
    email: {
      type: "string",
    },
  },
  {
    timestamps: true,
  }
);

const productData = mongoose.model("productData", productDataSchema);

productDataSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = productData;

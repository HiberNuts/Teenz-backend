import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
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

const formData = mongoose.model("formData", formDataSchema);

formDataSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject.__v;
  },
});

export default formData;

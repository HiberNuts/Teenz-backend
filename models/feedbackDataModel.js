const mongoose = require("mongoose");

const feedbackDataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    feedback: {
      type: String,
    },
    image: {
      type: String,
    },
    design: {
      type: Number,
    },
    creativity: {
      type: Number,
    },
    fit: {
      type: Number,
    },
    quality: {
      type: Number,
    },
    timeline: {
      type: Number,
    },
    response: {
      type: Number,
    },

    overall: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const feedbackData = mongoose.model("feedbackData", feedbackDataSchema);

feedbackDataSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

module.exports = feedbackData;

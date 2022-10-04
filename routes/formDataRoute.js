// for form data routes
const express = require("express");
const form = require("../controllers/formDataController.js");
const upload = require("../utils/multer");
const formData = require("../models/formDataModel.js");

const formDataRouter = express.Router();

formDataRouter.route("/formData").post(form.postFormData);
formDataRouter.route("/formData").get(form.getFormData);
formDataRouter.route("/formDataById/:id").get(form.getFormDataByID);

formDataRouter.route("/formData/photo/:id").post(upload("image").single("file"), async (req, res, next) => {
  const url = `${req.protocol}://${req.get("host")}`;
  const { file } = req;
  const formId = req.params.id;
  try {
    if (!file) {
      const error = new Error("Please upload a file");
      error.httpStatusCode = 400;
      return next(error);
    }
    const form = await formData.findById(formId);
    console.log(form);
    if (!form) return res.sendStatus(404);
    form.image = `${url}/${file.path}`;
    await form.save();
    res.send({ form, file });
  } catch (e) {
    console.log(e);
    res.sendStatus(400).send(e);
  }
});

module.exports = formDataRouter;

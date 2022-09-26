// for form data routes
const express = require("express");
const form = require("../controllers/formDataController.js");

const formDataRouter = express.Router();

formDataRouter.route("/formData").post(form.postFormData);
formDataRouter.route("/formData").get(form.getFormData);
formDataRouter.route("/formDataById/:id").get(form.getFormDataByID);

module.exports = formDataRouter;

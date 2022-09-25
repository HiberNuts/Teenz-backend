// for form data routes
import express from "express";
import { postFormData, getFormData, getFormDataByID } from "../controllers/formDataController.js";

const formDataRouter = express.Router();

formDataRouter.route("/formData").post(postFormData);
formDataRouter.route("/formData").get(getFormData);
formDataRouter.route("/formDataById/:id").get(getFormDataByID);

export default formDataRouter;

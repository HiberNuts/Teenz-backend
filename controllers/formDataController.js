import formData from "../models/formDataModel.js";

const postFormData = async (req, res) => {
  try {
    const data = req.body;

    const result = await formData.create(data);

    if (result) {
      console.log(result);
      res.json({ status: true });
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

export { postFormData, getFormData, getFormDataByID };

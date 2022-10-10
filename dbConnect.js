const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const uri = "mongodb+srv://raghav:raghav@cluster0.b8toxit.mongodb.net/database?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Mongodb connected `);
  } catch (error) {
    console.log(`Inside dbConnecter - Error : ${error.message}`);
  }
};

module.exports = connectDB;

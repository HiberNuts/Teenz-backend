const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const uri = "mongodb+srvraghavraghav@cluster0.b8toxit.mongodb.netdatabaseretryWrites=true&w=majority";

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

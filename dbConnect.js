import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`Mongodb connected `);
  } catch (error) {
    console.log(`Inside dbConnecter - Error : ${error.message}`);
  }
};

export default connectDB;

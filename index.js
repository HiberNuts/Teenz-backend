//importing
import dotenv from "dotenv";
import express from "express";
import connectDB from "./dbConnect.js";

import formDataRouter from "./routes/formDataRoute.js";

//constants
const app = express();
const PORT = process.env.PORT || 3001;

//additional functions
app.use(express.json());
dotenv.config();

connectDB();

//routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/", formDataRouter);

//error middleware always should be in last
// app.use(loginErrorMiddleware);
// app.use(notFoundMiddleware);

//caalling
app.listen(PORT, () => {
  console.log("server running at port http://localhost:3001");
});

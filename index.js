//importing
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./dbConnect");
const formDataRouter = require("./routes/formDataRoute.js");

//constants
const app = express();
const PORT = process.env.PORT || 3005;

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
  console.log("server running at port http://localhost:3005");
});

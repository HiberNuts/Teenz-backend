//importing
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./dbConnect");
const formDataRouter = require("./routes/formDataRoute.js");
const multer = require("multer");
const cors = require("cors");
const autoIncrement = require("mongoose-auto-increment");
const sendMailRouter = require("./routes/sendMailRouter");

//constants
const app = express();
const PORT = process.env.PORT || 3001;

//additional functions
app.use(express.json({ limit: "50mb" }));
app.disable("x-powered-by");
// app.use(express.urlencoded());
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.set("view engine", "ejs");
dotenv.config();
app.use(cors());

connectDB();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// const upload = multer({ storage: storage });

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

//routes
app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/", formDataRouter);
app.use("/", sendMailRouter);

//error middleware always should be in last
// app.use(loginErrorMiddleware);
// app.use(notFoundMiddleware);

//caalling
app.listen(PORT, () => {
  console.log("server running at port http://localhost:3001");
});

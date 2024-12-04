//create an express app
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const interviewRoutes = require("./routes/interview");
const homeRoutes = require("./routes/home");
const companyRoutes = require("./routes/company");
const testRoutes = require("./routes/testmenu");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI);

//create app.listen saying server is live
app.use("/interview", interviewRoutes);
app.use("/", homeRoutes);
app.use("/companies", companyRoutes);
app.use("/tests", testRoutes);
app.listen(3000, () => {
  console.log("Server is live on port 3000");
});

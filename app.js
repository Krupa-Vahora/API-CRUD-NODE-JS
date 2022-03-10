const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const empRoute = require("./routes/empRoute");
const empBioRoute = require("./routes/empBioRoute");
const url = "mongodb://localhost/demo";
const app = express();
app.use(express.static(path.join(__dirname, "/public")));
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("Connected");
});
app.use(express.json());
//route
app.use("/emp", empRoute);
app.use("/empBio", empBioRoute);
app.listen(3000, () => {
  console.log("Server Started");
});

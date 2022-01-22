const express = require("express");
const path = require("path");
const app = express();
const imageRoute = require("./routes/imageRoute");
app.use(express.static("public"));
app.use(express.json());
app.use("/api/v1/image-upload", imageRoute);
module.exports = app;

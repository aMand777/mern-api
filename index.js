const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const app = express();
const authRoutes = require("./src/routes/auth");
const blogRoute = require("./src/routes/blog");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  }
});

const filterFile = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json()); //type json
app.use(multer({ storage: fileStorage, filter: filterFile }).single("image"));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Method", "GET, POST, PUT, PITCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use("/v1/auth", authRoutes);
app.use("/v1/blog", blogRoute);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(
    "mongodb://amandd:JstvoAI7uxoMDcyV@ac-thyb6m5-shard-00-00.yhd5zar.mongodb.net:27017,ac-thyb6m5-shard-00-01.yhd5zar.mongodb.net:27017,ac-thyb6m5-shard-00-02.yhd5zar.mongodb.net:27017/?ssl=true&replicaSet=atlas-pn5phv-shard-0&authSource=admin&retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5500, () => console.log("Connections Success"));
  })
  .catch((err) => console.log(err));

const functions = require("firebase-functions");
const admin = require("firebase-admin");

require("dotenv").config();

const serviceAccountKey = require("./serviceAccountKey.json");

const express = require("express");
// const exp = require("cons tants");
const app = express();

// body parser JSON data
app.use(express.json());

//cross orgin
const cors = require("cors");
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

//firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
});

//API endpoints
app.get("/", (req, res) => {
  return res.send("hello Karan");
});

const userRoute = require("./routes/user");
app.use("/api/users", userRoute);

const productRoute = require("./routes/products");
app.use("/api/products/", productRoute);

exports.app = functions.https.onRequest(app);

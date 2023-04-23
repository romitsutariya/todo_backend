require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const morgon =require("morgan")
const User = require("./model/user");
const auth = require("./middleware/auth");
const userRoute=require("./router/userRoute")
const homeRoute=require("./router/homeRoute")
const cors=require('cors');


const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(morgon('combined'));
app.use(cors());

app.get("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

app.use("/api/user",userRoute)
app.use("/api",homeRoute)

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

module.exports = app;

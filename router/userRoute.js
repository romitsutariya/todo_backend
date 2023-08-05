
const express = require('express');
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!(email && password)) {
        return res.status(400).send("All input is required");
      }
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        user.token = token;
        return res.status(200).json(user);
      }
     return res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
      return res.status(500).json({message:"Internal server error"});
    }
  });

  router.post("/register", async (req, res) => {
    try {
  
      const { firstname, lastname, email, password } = req.body;
      if (!(email && password && firstname && lastname)) {
        return res.status(400).send("All input is required");
      }
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
      encryptedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        firstname,
        lastname,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      user.token = token;
      return res.status(201).json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json({message:"Internal server error"});
    }
  });

  module.exports=router
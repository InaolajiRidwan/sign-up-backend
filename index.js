const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app = express();
app.use(express.json());

const dotEnv = require("dotenv");
const Auth = require("./authModel");
dotEnv.config();
const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MONGODB CONNECTED");
  app.listen(PORT, () => {
    console.log(`server is running .... ${PORT}`);
  });
});

app.post("/sign-up", async (req, res) => {
  try {
    const { email, password, firstName, lastName, state } = req.body;
    if (!email) {
      res.status(400).json({
        message: "Please add your email",
      });
    }

    if (!password) {
      res.status(400).json({
        message: "Please add your password",
      });
    }

    if (password.length < 6) {
      res.status(400).json({
        message: "Password should be a min of 6 char",
      });
    }

    const existingUser = await Auth.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User account already existing",
      });
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = new Auth({
      email,
      password: hashPassword,
      firstName,
      lastName,
      state,
    });

    await newUser.save();

    //send user an email

    res.status(201).json({
      message: "User account created successfully",
      newUser: { email, password, firstName, lastName, state },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

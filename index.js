const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
const Auth = require("./models /authModel");
const cors = require("cors");
const routes = require("./Routes");
dotEnv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("MONGODB CONNECTED");
  app.listen(PORT, () => {
    console.log(`server is running .... ${PORT}`);
  });
});

app.use("/api", routes);

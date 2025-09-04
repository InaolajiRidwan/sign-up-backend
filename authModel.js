const mongoose = require("mongoose");

const authSchema = new mongoose.Schema(
  {
    email: { type: String, require: true },
    password: { type: String, require: true },
    firstName: { type: String, deault: " " },
    lastName: { type: String, default: " " },
    state: { type: String, default: " " },
    veerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Auth = new mongoose.model("Auth", authSchema);

module.exports = Auth;

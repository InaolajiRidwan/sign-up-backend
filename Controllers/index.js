const Auth = require("../models /authModel");
const { isValidEmail } = require("../sendMail");
const bcrypt = require("bcryptjs");

const handleUserRegistration = async (req, res) => {
  try {
    const { email, password, firstName, lastName, state } = req.body;
    if (!email) {
      res.status(400).json({
        message: "Please add your email",
      });
    }

    if (!isValidEmail(email)) {
      return res.status(404).json({
        message: "Incorrect email format",
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

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new Auth({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      state,
    });

    await newUser.save();

    //SEND USER AN EMAIL

    res.status(201).json({
      message: "User account created successfully",
      newUser: { email, firstName, lastName, state },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const { findUserService } = require("../Service");

const handleGetAllUsers = async (req, res) => {
  const allUser = await findUserService();
  return res.status(200).json({
    message: "successful",
    allUser,
  });
};



module.exports = { handleGetAllUsers, handleUserRegistration };

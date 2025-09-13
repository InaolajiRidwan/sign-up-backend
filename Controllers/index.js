const Auth = require("../models /authModel");
const jwt = require("jsonwebtoken")
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

const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "user account does not exist",
    });
  }

  const isMatch = await bcrypt.compare(password, user?.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Incorrect Email or Password",
    });
  }

  // if(!user.verified){

  // }

  //GENERATE TOKEN
  const accessToken = jwt.sign({ id: user?._id }, process.env.ACCESS_TOKEN, {
    expiresIn: "5h",
  });

  const refreshToken = jwt.sign({ id: user?._id }, process.env.REFRESH_TOKEN, {
    expiresIn: "30d",
  });

  res.status(200).json({
    message: "Login successful",
    accessToken,
    user: {
      email: user?.email,
      firstName: user?.firstName,
      lastName: user?.lastName,
      state: user?.state,
      role: user?.role,
    },
    refreshToken,
  });
};

const handleForgotPassowrd = async (req, res) => {
  const { email, username } = req.body;

  // let user;
  // if(email){
  //   const user = awaith Auth.findOne({email})
  // }

  // if(username){
  //   const user = awaith Auth.findOne({username})
  // }

  const user = await Auth.findOne({ email });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  //send the user an email come with their token

  const accessToken = await jwt.sign({ user }, `${process.env.ACCESS_TOKEN}`, {
    expiresIn: "5m",
  });
  await sendMailTransport(email, accessToken);

  //send OTP(one time password)

  res.status(200).json({
    message: "Please check your email",
  });
};

const handleResetPassword = async (req, res) => {
  const { email, password } = req.body;
  const user = await Auth.findOne({ email: req.user.email });
  if (!user) {
    return res.status(404).json({
      message: "User account not found",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user.password = hashedPassword;
  await user.save();

  res.status(200).json({
    message: "Password reset successful",
  });
}

module.exports = { handleGetAllUsers, handleUserRegistration, handleLogin, handleForgotPassowrd, handleResetPassword };

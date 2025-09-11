const jwt = require("jsonwebtoken");
const Auth = require("../models /authModel");

const validateUserRegistration = (req, res, next) => {
  const { email, password, firstName, lastName, state } = req.body;

  const errors = [];

  if (!email) {
    errors.push("Please add your email");
  }
  if (!password) {
    errors.push("Please add your password");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: errors,
    });
  }

  next();
};

const authorization = async (req, res, next) => {
  const token = req.header("authorization");
  if (!token) {
    return res.status(403).json({
      message: "Please login",
    });
  }

  const splitToken = token.split(" ");
  const realToken = splitToken[1];

  const decoded = jwt.verify(realToken, `${process.env.ACCESS_TOKEN}`);
  console.log(decoded);
  if (!decoded) {
    return res.status(401).json({
      message: "Authorize user",
    });
  }
  const user = await Auth.findById(decoded.id);
  if (!user) {
    return res.status(404).json({
      message: "user account does not exist ",
    });
  }
//   if (user?.role !== "admin") {
//     return res.status(400).json({
//       message: "invalid Authorization",
//     });
//   }

  req.user = user;
  next();
  console.log(user);
};

module.exports = {
  validateUserRegistration,
  authorization,
};

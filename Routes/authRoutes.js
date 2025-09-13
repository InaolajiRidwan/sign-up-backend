const express = require("express");

const {
  handleLogin,
  handleGetAllUsers,
  handleForgotPassowrd,
  handleUserRegistration,
  handleResetPassword,
} = require("../Controllers");
const { validateUserRegistration, authorization } = require("../middlewares");
const router = express.Router();

//welcome
router.get("/", async (req, res) => {
  res.status(200).json({
    message: "welcome to my first backend",
  });
});

//login
router.post("/login", handleLogin);

router.get("/all-users", authorization, handleGetAllUsers);
//forgot password
router.post("/forgot-password", handleForgotPassowrd);
//signup
router.post("/sign-up", validateUserRegistration, handleUserRegistration);
router.patch("/reset-password", authorization, handleResetPassword);

module.exports = router;

//MVC -R
//MODELS VIEW(written by the front end), CONTROLLER, ROUTES

//MIDDLEWARE / AUTHORIZATION / VALIDATION

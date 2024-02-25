const express = require("express");
const router = express.Router();
const {
  getUser,
  createUser,
  forgotPassword,
  passwordReset,
} = require("../controllers/userControllers");
const authenticateUser = require("../middleware/userMiddleware");

router
  .post("/login", getUser)
  .post("/register_user", createUser)
  .get("/validateToken", authenticateUser, (req, res) => {
    res.status(200).send(req.user);
  })
  .post("/forgot_password", forgotPassword)
  .post("/password_reset", passwordReset);

module.exports = router;

const express = require("express");
const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userController");
const router = express.Router();

//routing for each api
router.route("/register").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").post(updateUserProfile);

module.exports = router;

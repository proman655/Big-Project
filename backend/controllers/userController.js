const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, Email, phoneNumber, password } = req.body;

  const userExist = await User.findOne({ Email });
  //can say email exist and add scenario for each input maybe
  if (userExist) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    firstName,
    lastName,
    Email,
    phoneNumber,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      Email: user.Email,
      password: user.password,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { Email, password } = req.body;

  const user = await User.findOne({ Email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      Email: user.Email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password!");
  }
});

module.exports = { registerUser, authUser };

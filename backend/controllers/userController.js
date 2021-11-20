const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//register
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

//login
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

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.Email = req.body.Email || user.Email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstname,
      lastName: updatedUser.lastname,
      Email: updatedUser.Email,
      phoneNumber: updatedUser.phoneNumber,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

module.exports = { registerUser, authUser, updateUserProfile };

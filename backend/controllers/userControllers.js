const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const router = require("../routes/userRoutes");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  console.log(process.env.SENDGRID_API_KEY);
  const msg = {
    from: "0parkjuhwan901@gmail.com",
    to: "appleid1226@gmail.com",
    subject: "Verify your Email",
    test: `
        Hello, thanks for registering on our site.
        Please copy and paste the address below to verify your account.
        http://localhost:3000/verify-email
      `,
    html: `
        <h1>Hello,</h1>
        <p>Thanks for registering on our site.</p>
        <p> Please click the link below to verify your account.</p>
      `,
  };
  try {
    await sgMail.send(msg);
    console.log("sent");
    // req.flash(
    //   "Success",
    //   "Thanks for registering. Please check your email to verify your account"
    // );
    // res.redirect("/");
  } catch (error) {
    console.log(error);
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });

    //const emailtoken = crypto.randomBytes(64).toString('hex');
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.pic = req.body.pic || user.pic;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      pic: updatedUser.pic,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(401);
    throw new Error("Please Fill in all Fields");
  }
});
module.exports = { registerUser, authUser, updateUserProfile };

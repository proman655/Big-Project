const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const registerUser = asyncHandler(async (req, res) => {
    const {firstName, lastName, Email, phoneNumber, password} = req.body;

    const userExist = await User.findOne({Email});
    //can say email exist and add scenario for each input maybe
    if(userExist){
        res.status(400);
        throw new Error("User Already Exist");
    }

    const user = await User.create({
        firstName,
        lastName,
        Email,
        phoneNumber,
        password

    });
    
    if(user){
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            Email: user.Email,
            password:user.password,
            phoneNumber: user.phoneNumber
        })
    }else{
        res.status(400);
        throw new Error("Error Occured");
    }

    // res.json({
    //     firstName,
    //     lastName,
    //     Email,
    //     phoneNumber,
    // });
});
module.exports = {registerUser};
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt.js');

const userSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required: true,
        },
        lastName:{
            type: String,
            required: true,
        },
        Email:{
            type: String,
            required: true,
        },
        phoneNumber:{
            type: String,
            required: true,
        },
        password:{
            type: String,
            required: true,
        },
        project:{
            type: Array,
            id:{
                type: String,
            },
            required: false,
        },
        

    }
);

const User = mongoose.model("User",userSchema);

module.exports = User;
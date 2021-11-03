const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

});

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User",userSchema);

module.exports = User;
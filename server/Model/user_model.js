const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {jwt}=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
        default: ""
    },
    password: {
        type: String,
        required: true,
    },
    user_type: {
        type: Number,
        required: true,
        default: 0,
    },
});

// Secure the password with bcrypt before saving
userSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified("password")) {
        return next();
    }

    try {
        
        const hashedPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

// for getting the userinfo
userSchema.methods.getInfo= function(){
    return {
        username:this.username,
        email:this.email,
        address:this.address,
        user_type:this.user_type,
    }
}

//JWT-Json Web Token
userSchema.methods.generateToken= async function(){
    try {
        return jwt.sign(
        {
            userId:this._id.toString(),
            email:this.email,
            admin:this.admin,
            address:this.address,
        },
        process.env.JWT_SECRETKEY,
        {
            expiresIn: "30d",
        });
    } catch (error) {
        console.error(error);
    }
}

// Connecting with the Collection/Model
const Users = mongoose.model("Users", userSchema);

module.exports = Users;

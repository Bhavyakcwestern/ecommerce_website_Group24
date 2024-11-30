const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const {jwt}=require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    admin: {
        type: Boolean,
        required: false,
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
        const saltRound = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});

//JWT-Json Web Token
userSchema.method.generateToken= async function(){
    try {
        return jwt.sign(
        {
            userId:this._id.toString(),
            email:this.email,
            admin:this.admin,
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

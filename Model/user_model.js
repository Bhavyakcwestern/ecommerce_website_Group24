const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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



// Connecting with the Collection/Model
const Users = mongoose.model("Users", userSchema);

module.exports = Users;

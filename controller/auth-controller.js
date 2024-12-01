
const UserModel= require('../Model/user_model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const home = async (req, res) => {
    try {
        res.status(200).send('Hello World from server router js ***');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    // Validate password type
    if (typeof password !== 'string' || password.trim() === '') {
      return res.status(400).json({ message: "Password must be a non-empty string", success: false });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists, you can log in', success: false });
    }

    // Create a new user instance
    const newUser = new UserModel({ name, email, password });

    // Log the password before hashing for debugging
    console.log('Password before hashing:', password);

    // Hash the password
    newUser.password = await bcrypt.hash(password, 10);

    // Save the new user to the database
    await newUser.save();

    res.status(201).json({ message: "Signup successfully", success: true });
  } 
  catch (err) {
    console.error('Error in signup:', err); // Log the exact error
    res.status(500)
        .json({
            message: "Internal server errror in catch",
            success: false
        })
    }
  };


  const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.status(200)
            .json({
                message: "Login Success",
                success: true,
                jwtToken,
                email,
                name: user.name
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server errror",
                success: false
            })
    }
}

module.exports = { home, signup,login};

const User = require('../Model/user_model');

const home = async (req, res) => {
    try {
        res.status(200).send('Hello World from server router js ***');
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};

const register = async (req, res) => {
    try {
      const {username,email,phone,password}=req.body;

       //User Validation if user email id exists or not
      const userExist=await User.findOne({email:email});

      if(userExist){
        return res.status(400).json({msg:"email already exist"});
      } 
      
      console.log(req.body);
      
      await User.create({username,email,phone,password});
      res.status(200).json({ msg: "User registered successfully" });
      
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { home, register };

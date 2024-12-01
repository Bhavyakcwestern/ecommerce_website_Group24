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
      const {username,email,phone,password}=req.body;  //Destructuring user request 

       //User Validation if user email id exists or not
      const userExist=await User.findOne({email:email});
      if(userExist){
        return res.status(400).json({msg:"email already exist"});
      } 
      
      //Pushing request to our remote MongoDB database
      console.log(req.body);
      const userCreated=await User.create({username,email,phone,password});

      res.status(201).json({ msg: userCreated,
                            token:await userCreated.generateToken,
                            userId:userCreated._id.toString(),
       });
      
    }
     catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // get username and password
  // fetch the username from db
  // if not exist - throw 401 error
  // if exists - check the password. If no match - throw 401
  // generate the jwt and send as 200 status with jwt resp
  const login = async (req, res) => {
    try {
      const {username,password}=req.body;  //Destructuring user request 

       //User Validation if user email id exists or not
      const userExist=await User.findOne({email:email});
      if(!userExist){
        return res.status(400).json({msg:"bad already exist"});
      } 
      
      //Pushing request to our remote MongoDB database
      console.log(req.body);
      // const userCreated=await User.create({username,email,phone,password});

      // check password

      res.status(201).json({ msg: userCreated,
                            token:await userCreated.generateToken,
                            userId:userCreated._id.toString(),
       });
      
    }
     catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { home, register };

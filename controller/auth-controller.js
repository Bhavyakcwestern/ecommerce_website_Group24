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
      const data = req.body;
      console.log(req.body);
      // res.status(201).json({ message: "User registered successfully" });
      res.status(200).json({ message: data });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  };

module.exports = { home, register };

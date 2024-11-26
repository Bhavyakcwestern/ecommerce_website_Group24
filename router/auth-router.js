const express = require("express");
const router = express.Router();

const { home,register } = require("../controller/auth-controller");

// Use `.get()` to define GET routes
// router.get('/', (req, res) => {
//     res.status(200).send('Hello World from server router js ***');
// });

router.route('/').get(home);
router.route('/register').post(register);

module.exports = router;

const express = require("express");
const router = express.Router();

const auth_controller = require("../controller/auth-controller");

// Use `.get()` to define GET routes
// router.get('/', (req, res) => {
//     res.status(200).send('Hello World from server router js ***');
// });

router.route('/').get(auth_controller.home);
router.route('/register').post(auth_controller.register);

module.exports = router;

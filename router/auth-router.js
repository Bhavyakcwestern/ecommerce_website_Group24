const express = require("express");
const router = express.Router();

const auth_controller = require("../controller/auth-controller");
const { signupValidation, loginValidation } = require("../Middlewares/auth-Validation");

// Use `.get()` to define GET routes
// router.get('/', (req, res) => {
//     res.status(200).send('Hello World from server router js ***');
// });

router.route('/').get(auth_controller.home);
// router.route('/login').post(auth_controller.login);
router.route('/signup').post(auth_controller.signup);

// router.post('/login', loginValidation, auth_controller.login);
// router.post('/signup', signupValidation,auth_controller.signup);

module.exports = router;

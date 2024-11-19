const express = require("express");
const router = express.Router();

// Use `.get()` to define GET routes
// router.get('/', (req, res) => {
//     res.status(200).send('Hello World from server router js ***');
// });

router.route('/').get( (req, res) => {
    res.status(200)
    .send('Hello World from server router js ***');
});

router.route('/register').get( (req, res) => {
    res.status(200)
    .send('Hello World from register router js');
});

module.exports = router;

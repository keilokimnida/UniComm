const router = require('express').Router();

// CONTROLLERS
const authController = require("./controllers/auth");

router.get('/', (req, res, next) => {
    res.status(200).send('Welcome to UniComm Backend!');
});

// LOGIN
router.post("/login", authController.clientLogin);

module.exports = router;
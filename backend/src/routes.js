const router = require('express').Router();

// CONTROLLERS
const authController = require("./controllers/auth");
const accountController = require("./controllers/account");

router.get('/', (req, res, next) => {
    res.status(200).send('Welcome to UniComm Backend!');
});

// LOGIN
router.post("/login", authController.clientLogin);

    // ACCOUNTS
router.post("/account", accountController.createAccount);

module.exports = router;
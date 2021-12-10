const router = require('express').Router();

// CONTROLLERS
const authController = require("./controllers/auth");
const accountController = require("./controllers/account");

// MIDDLEWARES
const { isLoggedIn } = require("./middlewares/login");

router.get('/', (req, res, next) => {
    res.status(200).send('Welcome to UniComm Backend!');
});

// LOGIN
router.post("/login", authController.clientLogin);

// ACCOUNTS
router.get("/account/:accountID", isLoggedIn, accountController.findAccountByID);
router.post("/account", accountController.createAccount);

module.exports = router;
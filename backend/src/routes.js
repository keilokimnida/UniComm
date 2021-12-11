const router = require('express').Router();

// CONTROLLERS
const authController = require("./controllers/auth");
const accountController = require("./controllers/account");
const roomController = require("./controllers/room");
const friendshipController = require("./controllers/friendship");

// MIDDLEWARES
const { isLoggedIn } = require("./middlewares/login");

router.get('/', (req, res, next) => {
    res.status(200).send('Welcome to UniComm Backend!');
});

// LOGIN
router.post("/login", authController.clientLogin);

// ACCOUNTS
router.get("/account/:accountID", isLoggedIn, accountController.findAccountByID);
router.get("/account/search/:username", isLoggedIn, accountController.findAccountByUsername);
router.post("/account", accountController.createAccount);

// CHAT ROOM
router.get("/room/:accountID", isLoggedIn, roomController.findChatRoomByAccountID);

// FRIENDSHIPS
router.get("/friendship/:accountID", isLoggedIn, friendshipController.findAllFriendshipsByAccountID);
router.get("/friendship/request/incoming", isLoggedIn, friendshipController.findAllIncomingFriendRequest);
router.post("/friendship/request/:accountID", isLoggedIn, friendshipController.sendFriendshipRequest);
router.post("/friendship/accept/:accountID", isLoggedIn, friendshipController.acceptFriendshipRequest);
router.post("/friendship/decline/:accountID", isLoggedIn, friendshipController.declineFriendshipRequest);

module.exports = router;
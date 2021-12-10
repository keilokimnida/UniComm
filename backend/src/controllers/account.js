const bcrypt = require("bcryptjs");

const { findAccountByID, createAccount } = require('../models/account');

// Get account by ID
module.exports.findAccountByID = async (req, res) => {
    try {

        const accountID = parseInt(req.params.accountID);
        if (isNaN(accountID)) return res.status(400).json({
            message: "Invalid parameter \"accountID\""
        });

        const account = await findAccountByID(accountID);
        if (!account) return res.status(404).json({
            message: `\"accountID\" ${accountID} not found`
        });

        return res.status(200).send(account);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error in controller > account.js > findAccountByID ! " + error);
    }
}

// Create account
module.exports.createAccount = async (req, res) => {
    try {
        const {email, username, password} = req.body;

        // Didn't do output sanitization, validation checks

        // Didn't checked whether email and username already exists

        if (!email || !username || !password) return res.status(400).json({
            message: `Missing fields`
        });

        // Randomly generate a pfp identifier
        const pfpInt = Math.floor(Math.random() * 10) + 1;

        // Create account in our database
        await createAccount(username, email, bcrypt.hashSync(password, 10), pfpInt);

        return res.status(200).send();

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error in controller > account.js > createAccount ! " + error);
    }
};
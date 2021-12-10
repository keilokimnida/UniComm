// NPM modules import
const faker = require("faker");
const bcrypt = require("bcryptjs");
const { Accounts } = require("../schemas/Accounts");

module.exports.seeder = async () => {
    // Create an account
    const username1 = "keilokimnida";
    const email1 = `${username1}@unicomm.com`;
    const pfpType1 = 1;
    await Accounts.create({
        username: username1,
        email: email1,
        pfp_type: pfpType1,
        passwords: [{
            password: bcrypt.hashSync("123", 10)
        }],
    }, {
        include: ["passwords"]
    });

    // Create second account
    const username2 = "dlwlrma";
    const email2 = `${username2}@unicomm.com`;
    const pfpType2 = 1;
    await Accounts.create({
        username: username2,
        email: email2,
        pfp_type: pfpType2,
        passwords: [{
            password: bcrypt.hashSync("123", 10)
        }],
    }, {
        include: ["passwords"]
    });

};
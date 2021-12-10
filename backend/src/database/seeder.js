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
        username1,
        email1,
        pfp_type: pfpType1,
        passwords: [{
            password: bcrypt.hashSync("123", 10)
        }],
    }, {
        include: ["passwords"]
    });

    // Create second account
    const username2 = "keilokimnida";
    const email2 = `${username2}@unicomm.com`;
    const pfpType2 = 1;
    await Accounts.create({
        username2,
        email2,
        pfp_type: pfpType2,
        passwords: [{
            password: bcrypt.hashSync("123", 10)
        }],
    }, {
        include: ["passwords"]
    });

};
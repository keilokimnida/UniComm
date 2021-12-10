const { Accounts } = require("../schemas/Accounts");

module.exports.createAccount = (username, email, password, pfpInt) => Accounts.create({
    username,
    email,
    pfp_type: pfpInt,
    passwords: [{
        password
    }]
}, {
    include: 'passwords'
});
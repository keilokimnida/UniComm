const { Op } = require('sequelize');

const { Accounts } = require("../schemas/Accounts");

module.exports.findAccountByID = (accountID) => Accounts.findByPk(accountID);

module.exports.findAccountsByUsername = (username, accountID) => Accounts.findAll({
    where: {
        username: {
            [Op.like]: `%${username}%`
        },
        account_id: {
            [Op.not]: accountID
        }
     }
});

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
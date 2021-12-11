const { Friend_Invitations } = require("../schemas/Friend_Invitations");
const { Friendships } = require("../schemas/Friendships");
const { Accounts } = require("../schemas/Accounts");

module.exports.findAllFriendshipsByAccountID = (accountID) => Friendships.findAll({
    where: {
        fk_account_id_1: accountID
    },
    include: [
        {
            model: Accounts,
            as: 'account_friend_1',
        }
    ]
});

module.exports.findSpecificFriendship = (requesteeID, addresseeID) => Friendships.findAll({
    where: {
        fk_account_id_1: requesteeID,
        fk_account_id_2: addresseeID
    },
});

module.exports.findAllIncomingFriendRequest = (accountID) => Friend_Invitations.findAll({
    where: {
        fk_addressee_id: accountID
    },
    include: [
        {
            model: Accounts,
            as: 'account_addressee',
        }
    ]
});

module.exports.findSpecificFriendRequest = (requesteeID, addresseeID) => Friend_Invitations.findAll({
    where: {
        fk_requester_id: requesteeID,
        fk_addressee_id: addresseeID
    },
});

module.exports.sendFriendshipRequest = (requesteeID, addresseeID) => Friend_Invitations.create({
    fk_requester_id: requesteeID,
    fk_addressee_id: addresseeID
});

module.exports.removeFriendshipRequest = (requesteeID, addresseeID) => Friend_Invitations.destroy({
    where: {
        fk_requester_id: requesteeID,
        fk_addressee_id: addresseeID
    }
});

module.exports.addFriendship = (requesteeID, addresseeID) => Friendships.bulkCreate([
    {
        fk_account_id_1: requesteeID,
        fk_account_id_2: addresseeID
    },
    {
        fk_account_id_1: addresseeID,
        fk_account_id_2: requesteeID
    }
])
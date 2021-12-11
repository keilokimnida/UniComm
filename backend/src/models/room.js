const { Rooms } = require("../schemas/Rooms");
const { Room_Members } = require("../schemas/Room_Members");


module.exports.findChatRoomByAccountID = (accountID) => Rooms.findAll({
    include: [
        {
            model: Room_Members,
            as: 'room_member',
            where: {
                fk_account_id: accountID
            }
        }
    ]
});
const { findChatRoomByAccountID } = require('../models/room');

// Get chat room by accountID
module.exports.findChatRoomByAccountID = async (req, res) => {
    try {

        const accountID = parseInt(req.params.accountID);
        if (isNaN(accountID)) return res.status(400).json({
            message: "Invalid parameter \"accountID\""
        });

        const chatRoom = await findChatRoomByAccountID(accountID);
        if (!chatRoom) return res.status(404).json({
            message: `\"chatRoom\" ${chatRoom} not found`
        });

        return res.status(200).send(chatRoom);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error in controller > room.js > findChatRoomByAccountID ! " + error);
    }
};
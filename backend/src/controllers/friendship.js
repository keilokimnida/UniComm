const { findAllFriendshipsByAccountID, findAllIncomingFriendRequest, findSpecificFriendship, findSpecificFriendRequest, sendFriendshipRequest, removeFriendshipRequest } = require('../models/friendship');

// Get friends by accountID
module.exports.findAllFriendshipsByAccountID = async (req, res) => {
    try {

        const accountID = parseInt(req.params.accountID);
        if (isNaN(accountID)) return res.status(400).json({
            message: "Invalid parameter \"accountID\""
        });

        const friendships = await findAllFriendshipsByAccountID(accountID);
        if (!friendships) return res.status(404).json({
            message: `\"friendships\" ${friendships} not found`
        });

        return res.status(200).send(friendships);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error in controller > friendship.js > findAllFriendshipsByAccountID ! " + error);
    }
};

// Send friend request
module.exports.sendFriendshipRequest = async (req, res) => {
    try {
        const { decoded } = res.locals.auth;
        const requesteeAccountID = decoded.account_id;

        const accountID = parseInt(req.params.accountID);
        if (isNaN(accountID)) return res.status(400).json({
            message: "Invalid parameter \"accountID\""
        });

        // Check if its sending request to himself
        if (requesteeAccountID === accountID)  return res.status(400).json({
            message: `Invalid operation, you cannot send request to yourself`
        });

        // Check if they're already friends
        const existingFriendship = await findSpecificFriendship(requesteeAccountID, accountID);
        if (existingFriendship.length > 0) return res.status(400).json({
            message: `Invalid operation, friendship already exists`
        });

        // Check if the user has already requested for friendship
        const outgoingRequestExist = await findSpecificFriendRequest(requesteeAccountID, accountID);
        if (outgoingRequestExist.length > 0) return res.status(400).json({
            message: `Invalid operation, invitation already exists`
        });

        // Check if the target account already send friendship invite
        const incomingRequestExist = await findSpecificFriendRequest(accountID, requesteeAccountID);

        if (incomingRequestExist.length > 0) return res.status(400).json({
            message: `Invalid operation, invitation already exists`
        });

        await sendFriendshipRequest(requesteeAccountID, accountID);

        return res.status(200).send();

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error in controller > friendship.js > findAllFriendshipsByAccountID ! " + error);
    }
};

// Accept friend request
module.exports.acceptFriendshipRequest = async (req, res) => {
    try {

        const { decoded } = res.locals.auth;
        const accountID = decoded.account_id;

        const requesteeAccountID = parseInt(req.params.accountID);
        if (isNaN(requesteeAccountID)) return res.status(400).json({
            message: "Invalid parameter \"accountID\""
        });

        // Check if they're already friends
        const existingFriendship = await findSpecificFriendship(requesteeAccountID, accountID);
        if (existingFriendship.length > 0) return res.status(400).json({
            message: `Invalid operation, friendship already exists`
        });

        // Check if the target account already send friendship invite
        const incomingRequestExist = await findSpecificFriendRequest(requesteeAccountID, accountID);
        if (incomingRequestExist.length === 0) return res.status(400).json({
            message: `Invalid operation, Friend request does not exist`
        });

        await removeFriendshipRequest(requesteeAccountID, accountID);
        await addFriendship(requesteeAccountID, accountID);

        return res.status(200).send();

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error in controller > friendship.js > findAllFriendshipsByAccountID ! " + error);
    }
};

// Decline friend request
module.exports.declineFriendshipRequest = async (req, res) => {
    try {

        const { decoded } = res.locals.auth;
        const accountID = decoded.account_id;

        const requesteeAccountID = parseInt(req.params.accountID);
        if (isNaN(requesteeAccountID)) return res.status(400).json({
            message: "Invalid parameter \"accountID\""
        });

        // Check if they're already friends
        const existingFriendship = await findSpecificFriendship(requesteeAccountID, accountID);
        if (existingFriendship.length > 0) return res.status(400).json({
            message: `Invalid operation, friendship already exists`
        });

        // Check if the target account already send friendship invite
        const incomingRequestExist = await findSpecificFriendRequest(requesteeAccountID, accountID);
        if (incomingRequestExist.length === 0) return res.status(400).json({
            message: `Invalid operation, Friend request does not exist`
        });

        await removeFriendshipRequest(requesteeAccountID, accountID);

        return res.status(200).send();

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error in controller > friendship.js > findAllFriendshipsByAccountID ! " + error);
    }
};

// Get incoming friend requests by accountID
module.exports.findAllIncomingFriendRequest = async (req, res) => {
    try {
        console.log("----");
        console.log("----");
        const { decoded } = res.locals.auth;
        const accountID = decoded.account_id;
        
        const incomingFriendRequests = await findAllIncomingFriendRequest(accountID);
    
        if (!incomingFriendRequests) return res.status(404).json({
            message: `\"incomingFriendRequests\" ${incomingFriendRequests} not found`
        });

        return res.status(200).send(incomingFriendRequests);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error in controller > friendship.js > findAllIncomingFriendRequest ! " + error);
    }
};
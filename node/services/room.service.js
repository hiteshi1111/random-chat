const { default: mongoose } = require("mongoose");
const Room = require("../schemas/room.schema");

let service = {};

service.checkAndAssignRoom = checkAndAssignRoom;
service.fetchRoomId = fetchRoomId;

// CHECKS AND ASSIGNS ROOM
async function checkAndAssignRoom(id) {
    try {
        const emptyRoom = await Room.findOne({
            $expr: { $lt: [{ $size: "$participants" }, 10] }
        });
        
        if (!emptyRoom) {
            const data = {
                participants: [new mongoose.Types.ObjectId(id)]
            };
            const newRoom = await Room.create(data);
            return newRoom._id;
        } else {
            const room = await Room.findByIdAndUpdate(
                emptyRoom._id,
                { $addToSet: { participants: new mongoose.Types.ObjectId(id) } },
                { new: true }
            );
            return room._id;
        }
    } catch (error) {
        console.log("Error assigning room >", error);
        return Promise.reject({
            statusCode: 500,
            message: "Error assigning room!"
        })
    }
}

// FETCHED ROOM ID FOR AN ACCOUNT
async function fetchRoomId(id) {
    try {
        const emptyRoom = await Room.findOne({
            participants: { $in: [id]}
        }).select("_id");
        return emptyRoom?._id;
    } catch (error) {
        console.log("Error fetching roomId!", error);
        return Promise.reject({
            statusCode: 500,
            message: "Error fetching roomId!"
        })
    }
}

module.exports = service;
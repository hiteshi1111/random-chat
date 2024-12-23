const { default: mongoose } = require("mongoose");
const Message = require("../schemas/message.schema");

let service = {};

service.createMessage = createMessage;
service.getMessages = getMessages;
service.createActivity = createActivity;

// CREATES ACCOUNT
async function createMessage(id, body) {
    try {
        body.from = new mongoose.Types.ObjectId(id);
        const newMessage = (await Message.create(body)).populate({
            path: "from",
            select: "username"
        });
        return newMessage;
    } catch (error) {
        console.log("create error >", error);
        return Promise.reject({
            statusCode: 500,
            message: "Message sending failed!"
        })
    }
}

// FETCHES MESSAGES
async function getMessages(roomId) {
    try{
        const messages = await Message.find({room: roomId}).populate({
            path: "from",
            select: "username"
        });
        return messages;
    }catch(error){
        console.log("messages fetch error >", error);
        return Promise.reject({
            statusCode: 500,
            message: "Message fetching failed!"
        })
    }
}

// CREATE ACTIVITY
async function createActivity(id, roomId) {
    try{
        let body = {
            from: new mongoose.Types.ObjectId(id),
            room: new mongoose.Types.ObjectId(roomId),
            activity: "joined the room"
        };
        const newMessage = await Message.create(body);
        return newMessage;
    }catch(error){
        console.log("messages fetch error >", error);
        return Promise.reject({
            statusCode: 500,
            message: "Message fetching failed!"
        })
    }
}

module.exports = service
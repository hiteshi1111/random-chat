const { default: mongoose } = require("mongoose");
const Message = require("../schemas/message.schema");

let service = {};

service.createMessage = createMessage;
service.getMessages = getMessages;

// CREATES ACCOUNT
async function createMessage(id, body) {
    try {
        body.from = new mongoose.Types.ObjectId(id);
        const newMessage = await Message.create(body);
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

module.exports = service
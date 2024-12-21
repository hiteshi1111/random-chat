const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    room: { type: mongoose.Schema.ObjectId, ref: "Room" },
    from: { type: mongoose.Schema.ObjectId, ref: "Account" },
    message: String,
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    label: { type: String, default: "Room" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Account" }],
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
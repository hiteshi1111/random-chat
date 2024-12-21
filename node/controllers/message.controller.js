const express = require('express');
const router = express.Router();
const MessageService = require('../services/message.service');
const RoomService = require('../services/room.service');
const { default: mongoose } = require('mongoose');

// CREATES NEW MESSAGE
router.post('/:id', async (req, res) => {
    try{
        let body = req.body;
        const id = await RoomService.fetchRoomId(req.params.id);
        body.room = new mongoose.Types.ObjectId(id);
        const messageData = await MessageService.createMessage(req.params.id, body);
        res.status(200).send(messageData);
    }catch(error){ 
        res.status(error.statusCode).send(error.message);
    }
});

// FETCHES ALL MESSAGES OF A SINGLE ACCOUNT
router.get('/:id', async (req, res) => {
    try{
        const id = await RoomService.fetchRoomId(req.params.id);
        const allMessages = await MessageService.getMessages(id);
        res.status(200).send(allMessages);
    }catch(error){ 
        res.status(error.statusCode).send(error.message);
    }
});

module.exports = router;
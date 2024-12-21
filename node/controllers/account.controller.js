const express = require('express');
const router = express.Router();
const AccountService = require('../services/account.service');

// CREATES NEW ACCOUNT
router.post('/', async (req, res) => {
    try{
        await AccountService.createAccount(req.body)
        res.status(200).send("OK");
    }catch(error){ 
        res.status(error.statusCode).send(error.message);
    }
});

// ACCOUNT LOGIN
router.post('/login', async (req, res) => {
    try{
        const response = await AccountService.loginAccount(req.body);
        res.status(200).send(response);
    }catch(error){
        res.status(error.statusCode).send(error.message);
    }
});

module.exports = router;
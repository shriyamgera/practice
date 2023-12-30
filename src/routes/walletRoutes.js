const express = require('express');
const {Wallet} = require('../models/walletModel');
const router = express.Router();

router.post('/setup', async function(req, res){
    try{
        const {balance, name} = req.body;

        const newWallet = new Wallet({balance, name});
        const savedWallet = await newWallet.save();

        const response ={
            id: savedWallet._id,
            balance: savedWallet.balance,
            transactionId: '4456494616454',
            name: savedWallet.name,
            date: new Date()
        }

        res.status(200).send(response);
    }catch(e){
        res.status(500).json({error: e.message});
    }
})


router.get('/', function(req, res){
    res.send("Hello, world!");
})

module.exports =router;
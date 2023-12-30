const express = require('express');
const Wallet = require('../models/walletModel');
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

router.post('/transact/:walletId', async (req, res) => {
    try {
        const walletId = req.params.walletId;
        const { amount, description } = req.body;

        const amountRegex = /^\d+(\.\d{1,4})?$/;
        if (!amountRegex.test(amount.toString())) {
            return res.status(400).json({ error: 'Invalid amount format.' });
        }

        const parsedAmount = parseFloat(amount).toFixed(4);

        const wallet = await Wallet.findById(walletId);

        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found.' });
        }

        const transactionType = parsedAmount >= 0 ? 'CREDIT' : 'DEBIT';

        const newBalance = wallet.balance + parsedAmount;

        const transaction = new Transaction({
            walletId: walletId,
            amount: Math.abs(parsedAmount),
            balance: newBalance,
            description: description,
            type: transactionType,
        });

        const savedTransaction = await transaction.save();

        wallet.balance = newBalance;
        await wallet.save();

        const response = {
            balance: newBalance,
            transactionId: savedTransaction._id,
        };
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

router.get('/wallet/:id', async (req, res) => {
    try {
        const walletId = req.params.id;

        // Retrieve the wallet from the database
        const wallet = await Wallet.findById(walletId);

        // Check if the wallet exists
        if (!wallet) {
            return res.status(404).json({ error: 'Wallet not found.' });
        }

        // Respond with the wallet details
        const response = {
            id: wallet._id,
            balance: wallet.balance,
            name: wallet.name,
            date: wallet.date,
        };

        res.status(200).json(response);
    } catch (e) {
        // Handle errors and send an error response
        res.status(500).json({ error: e.message });
    }
});

router.get('/', function(req, res){
    res.send("Hello, world!");
})

module.exports =router;
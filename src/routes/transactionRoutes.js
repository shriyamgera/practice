const express = require('express');
const { Transaction } = require('../models'); // Assuming you have a Transaction model
const router = express.Router();

// GET /transactions
router.get('/transactions', async (req, res) => {
    try {
        const { walletId, skip = 0, limit = 10 } = req.query;

        // Validate that walletId is provided
        if (!walletId) {
            return res.status(400).json({ error: 'WalletId is required.' });
        }

        // Retrieve transactions from the database
        const transactions = await Transaction.find({ walletId })
            .sort({ date: -1 }) // Sort by date in descending order (recent transactions first)
            .skip(parseInt(skip))
            .limit(parseInt(limit));

        // Map the transactions to the desired response format
        const formattedTransactions = transactions.map(transaction => ({
            id: transaction._id,
            walletId: transaction.walletId,
            amount: transaction.amount,
            balance: transaction.balance,
            description: transaction.description,
            date: transaction.date,
            type: transaction.type
        }));

        // Respond with the array of formatted transactions
        res.status(200).json(formattedTransactions);
    } catch (e) {
        // Handle errors and send an error response
        res.status(500).json({ error: e.message });
    }
});

module.exports = router;

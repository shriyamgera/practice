const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema({
  balance: { type: Number, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Wallet = mongoose.model("Wallet", WalletSchema);

// module.exports.WalletSchema = WalletSchema;
module.exports = Wallet;

// routes/token.js
const express = require('express');
const router = express.Router();
const { getWinLEWBalance, sendWinLEW } = require('../winlew-token');
const { PublicKey } = require('@solana/web3.js');

router.get('/balance/:wallet', async (req, res) => {
  try {
    const pubkey = new PublicKey(req.params.wallet);
    const balance = await getWinLEWBalance(pubkey);
    res.json({ balance });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

router.post('/send', async (req, res) => {
  try {
    const { to, amount } = req.body;
    const pubkey = new PublicKey(to);
    const tx = await sendWinLEW(pubkey, parseInt(amount));
    res.json({ tx });
  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

module.exports = router;

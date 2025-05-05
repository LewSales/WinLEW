require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Keypair, Connection, clusterApiUrl, PublicKey, sendAndConfirmTransaction, SystemProgram } = require('@solana/web3.js');
const { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction, getAccount } = require('@solana/spl-token');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const FAUCET_KEY = Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.FAUCET_SECRET)));
const MINT = new PublicKey(process.env.WINLEW_MINT);

app.post('/faucet', async (req, res) => {
  try {
    const { recipient } = req.body;
    const recipientPub = new PublicKey(recipient);
    const ata = await getAssociatedTokenAddress(MINT, recipientPub);
    const tx = new (require('@solana/web3.js')).Transaction();

    try {
      await getAccount(connection, ata);
    } catch {
      tx.add(createAssociatedTokenAccountInstruction(FAUCET_KEY.publicKey, ata, recipientPub, MINT));
    }

    tx.add(createTransferInstruction(await getAssociatedTokenAddress(MINT, FAUCET_KEY.publicKey), ata, FAUCET_KEY.publicKey, 1_000_000));

    const sig = await sendAndConfirmTransaction(connection, tx, [FAUCET_KEY]);
    res.json({ success: true, signature: sig });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT || 3001, () => console.log("Backend running on port", process.env.PORT || 3001));

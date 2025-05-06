
const fs = require('fs');
const { Keypair } = require('@solana/web3.js');

const secret = JSON.parse(fs.readFileSync('./keypair.json'));
const keypair = Keypair.fromSecretKey(new Uint8Array(secret));

const {
  Connection,
  Keypair,
  clusterApiUrl,
  PublicKey,
} = require('@solana/web3.js');
const {
  getAccount,
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} = require('@solana/spl-token');

// Your SPL token mint address (Devnet)
const WINLEW_MINT = new PublicKey('DnrcdQVH7fdbmm4EyD7LjT9mNNozF5HuWMeKcpvjpump');

// Load wallet
const secret = JSON.parse(fs.readFileSync('./keypair.json', 'utf8'));
const payer = Keypair.fromSecretKey(new Uint8Array(secret));

// Solana connection
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

// Get balance of WinLEW token
async function getWinLEWBalance(ownerPubkey) {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    WINLEW_MINT,
    ownerPubkey
  );
  return tokenAccount.amount; // in smallest units (like lamports)
}

// Transfer WinLEW to another wallet
async function sendWinLEW(destinationPubkey, amount) {
  const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    WINLEW_MINT,
    payer.publicKey
  );

  const toTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    WINLEW_MINT,
    destinationPubkey
  );

  const transferTx = createTransferInstruction(
    fromTokenAccount.address,
    toTokenAccount.address,
    payer.publicKey,
    amount, // In smallest units (e.g. 1000000 if 6 decimals)
    [],
    TOKEN_PROGRAM_ID
  );

  const tx = await connection.sendTransaction(
    {
      feePayer: payer.publicKey,
      recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
      instructions: [transferTx],
      signers: [payer],
    },
    { skipPreflight: false, preflightCommitment: 'confirmed' }
  );

  console.log('Transfer tx sent:', tx);
  return tx;
}

module.exports = { getWinLEWBalance, sendWinLEW };

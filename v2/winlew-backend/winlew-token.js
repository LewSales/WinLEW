const fs = require('fs');
const {
  Connection,
  Keypair,
  clusterApiUrl,
  PublicKey,
} = require('@solana/web3.js');
const {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  TOKEN_PROGRAM_ID
} = require('@solana/spl-token');

const WINLEW_MINT = new PublicKey('REPLACE_WITH_YOUR_WINLEW_MINT_ADDRESS');

const secret = JSON.parse(fs.readFileSync('./keypair.json', 'utf8'));
const payer = Keypair.fromSecretKey(new Uint8Array(secret));

const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

async function getWinLEWBalance(ownerPubkey) {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    WINLEW_MINT,
    ownerPubkey
  );
  return tokenAccount.amount;
}

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

  const transferIx = createTransferInstruction(
    fromTokenAccount.address,
    toTokenAccount.address,
    payer.publicKey,
    amount,
    [],
    TOKEN_PROGRAM_ID
  );

  const { blockhash } = await connection.getLatestBlockhash();
  const transaction = {
    feePayer: payer.publicKey,
    recentBlockhash: blockhash,
    instructions: [transferIx]
  };

  const tx = await connection.sendTransaction(transaction, [payer]);
  return tx;
}

module.exports = { getWinLEWBalance, sendWinLEW };
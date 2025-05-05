import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';

const WINLEW_MINT = new PublicKey('DnrcdQVH7fdbmm4EyD7LjT9mNNozF5HuWMeKcpvjpump');

const WinlewBalance = () => {
  const { publicKey } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!publicKey) return;

    (async () => {
      try {
        const ata = await getAssociatedTokenAddress(WINLEW_MINT, publicKey);
        const accountInfo = await getAccount(connection, ata);
        setBalance(Number(accountInfo.amount) / 1e6); // Adjust decimals as needed
      } catch (e) {
        console.log('No WinLEW account found');
        setBalance(0);
      }
    })();
  }, [publicKey, connection]);

  return <div>WinLEW Balance: {balance}</div>;
};

export default WinlewBalance;

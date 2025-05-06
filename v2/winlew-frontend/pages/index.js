import { useState } from 'react';

export default function Home() {
  const [wallet, setWallet] = useState('');
  const [balance, setBalance] = useState(null);
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [tx, setTx] = useState(null);

  async function fetchBalance() {
    const res = await fetch(`http://localhost:3001/api/token/balance/${wallet}`);
    const data = await res.json();
    setBalance(data.balance);
  }

  async function sendTokens() {
    const res = await fetch('http://localhost:3001/api/token/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, amount })
    });
    const data = await res.json();
    setTx(data.tx);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>WinLEW Token dApp</h1>
      <div>
        <input placeholder="Enter wallet" value={wallet} onChange={e => setWallet(e.target.value)} />
        <button onClick={fetchBalance}>Check Balance</button>
        {balance && <p>Balance: {balance}</p>}
      </div>
      <div style={{ marginTop: 20 }}>
        <input placeholder="Send to wallet" value={to} onChange={e => setTo(e.target.value)} />
        <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
        <button onClick={sendTokens}>Send WinLEW</button>
        {tx && <p>Transaction: {tx}</p>}
      </div>
    </div>
  );
}
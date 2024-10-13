import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import solana from '../assets/sol.png';

export default function Balance() {
  const [balance, setBalance] = useState(0);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (!publicKey) {
      setBalance(null);
      return;
    }

    const fetchBalance = async () => {
      try {
        const balance = await connection.getBalance(publicKey);
        setBalance(balance / LAMPORTS_PER_SOL);
      } catch (error) {
        console.error('Failed to fetch balance:', error);
        setBalance(null);
      }
    };

    fetchBalance();
    const intervalId = setInterval(fetchBalance, 10000); // Update every 10 seconds

    return () => clearInterval(intervalId);
  }, [publicKey, connection]);

  if (balance === null) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg text-white">
      <img src={solana} alt="Solana Logo hidden md:flex" className="h-6 " />
      <span className="font-medium hidden md:flex">Balance:</span>
      
      <span className="font-bold text-indigo-400">{balance.toFixed(4)} SOL</span>
    </div>
  );
}

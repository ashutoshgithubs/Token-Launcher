import React from 'react'
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from './ui/button'
import { Label } from "./ui/label"
import { toast } from '@/hooks/use-toast'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import { useNavigate } from 'react-router-dom'
import { TiArrowBack } from "react-icons/ti";

export default function Airdrop() {
    const navigate = useNavigate();
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false);
    const wallet = useWallet();
    const { connection } = useConnection();

    const address = wallet.publicKey;

    useEffect(() => {
      if (!wallet.connected) {
        toast({
          title: "Warning",
          description: "Wallet disconnected! Please Connect your wallet.",
          variant: "destructive",
        });
        navigate('/');
      }
    }, [wallet.connected, navigate]);

    const handleAirdrop = async () => {
      if (!wallet.connected) {
        toast({
          title: "Warning",
          description: "Wallet disconnected. Please select a wallet.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }

      if (!address || !amount) {
        toast({
          title: "Error",
          description: "Please enter an amount.",
          variant: "destructive",
        });
        return;
      }

      try {
        setLoading(true);
        await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);

        toast({
          title: "Airdrop Initiated",
          description: `Airdropping ${amount} SOL to ${address}`,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({
          title: `Airdropping ${amount} SOL to ${address} is terminated.`,
          description: error.message || "An unexpected error occurred.",
          variant: "destructive"
        });
        navigate('/');
      }
    }

    return (
      <div className='mt-16'>
        {
          loading && (
            <div className="w-full max-w-md mx-auto my-auto flex justify-center">
              <div className='spinner '></div>
            </div>
          )
        }
        {
          !loading && (
            <div className="w-full max-w-md mx-auto">
              <Card className="shadow-lg shadow-gray-50">
                <CardHeader>
                  <CardTitle>Solana Airdrop</CardTitle>
                  <CardDescription>Enter an amount to airdrop SOL</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount of SOL</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="Enter amount of SOL"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      min="0"
                      step="0.1"
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleAirdrop}>
                    Airdrop SOL
                  </Button>
                </CardFooter>
              </Card>
              <CardFooter className="flex justify-center mt-3 text-2xl cursor-pointer">
                <TiArrowBack onClick={() => navigate('/')} title="Back to Home" />
              </CardFooter>
            </div>
          )
        }
      </div>
    );
}

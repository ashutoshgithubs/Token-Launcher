"use client"

import { useState, useEffect } from "react"
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Label } from "./ui/label"
import { toast } from '@/hooks/use-toast'


export default function LaunchFuel() {
  const wallet = useWallet();
  const { connection } = useConnection()
  const { publicKey } = useWallet()
  const [amount, setAmount] = useState("")
  const [balance, setBalance] = useState(0)
  const [loading, setLoading] = useState(false)
 const Recipientaddress = import.meta.env.VITE_AdminWalletKey;
  useEffect(() => {
    // Fetch and update the user's SOL balance
    const fetchBalance = async () => {
      if (publicKey) {
        const balanceInLamports = await connection.getBalance(publicKey)
        setBalance(balanceInLamports / LAMPORTS_PER_SOL) // Convert lamports to SOL
      }
    }

    fetchBalance()
  }, [publicKey, connection])

  const handleSendToAdmin = async () => {
    if (!wallet.connected) {
        toast({
          title: "Warning",
          description: "Wallet disconnected. Please select a wallet.",
          variant: "destructive",
        });
        navigate('/');
        return;
      }
      if (!Recipientaddress) {
        toast({
          title: "Error",
          description: "Something went wrong at Recipient's wallet!",
          variant: "destructive",
        })
        return
      }
    const enteredAmount = parseFloat(amount)

    if (!amount || isNaN(enteredAmount) || enteredAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      })
      return
    }

    if (enteredAmount > balance) {
      toast({
        title: "Insufficient balance",
        description: "The entered amount exceeds your wallet balance.",
        variant: "destructive",
      })
      return
    }
    
  
      const transaction = new Transaction();
      transaction.add(SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(Recipientaddress),
        lamports: amount * LAMPORTS_PER_SOL,
    }));


    try{
        setLoading(true);
        const res = await wallet.sendTransaction(transaction, connection);
        // console.log("RES: ", res);
        // console.log(`Airdropping ${amount} SOL to ${Recipientaddress}`)
        toast({
          title: "Thank you!",
          description: `You have fueled my rocket with ${amount} SOL.`,
        })
        setLoading(false);
      }
      catch(error){
        setLoading(false);
        toast({
          title: `Sending ${amount} SOL to ${Recipientaddress} is terminated.`,
          description: error.message || "An unexpected error occurred.",
          variant: "destructive"
        })
        // return;
        navigate('/');
      }
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-16">
      <CardHeader>
        <CardTitle>Send SOL to Admin (Dev Mode)</CardTitle>
        <CardDescription>Support the project by sending any amount of SOL (dev mode)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (SOL)</Label>
          {/* <Input
            id="amount"
            type="number"
            placeholder="Enter amount of SOL"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.000000001"
          /> */}
          <Input
            id="amount"
            type="number"
            placeholder="Enter amount of SOL"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="0.1"
           />
          <p>Your Balance: {balance.toFixed(4)} SOL</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleSendToAdmin}
          disabled={loading || !amount}
        >
          {loading ? "Processing..." : "Send SOL"}
        </Button>
      </CardFooter>
    </Card>
  )
}

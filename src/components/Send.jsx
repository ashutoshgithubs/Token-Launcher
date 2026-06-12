
import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Label } from "./ui/label"
import { toast } from '@/hooks/use-toast'
import { useConnection, useWallet } from "@solana/wallet-adapter-react"
import { Transaction,SystemProgram, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js"
import { useNavigate } from "react-router-dom"
import { TiArrowBack } from "react-icons/ti"
import { parseSolAmount } from "@/lib/solAmount"

export default function Send() {
  const [Recipientaddress, setRecipientAddress] = useState("")
  const [amount, setAmount] = useState("")
  const wallet = useWallet();
  const {connection} = useConnection();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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


  const handleSend = async () => {
    if (!wallet.connected) {
      toast({
        title: "Warning",
        description: "Wallet disconnected. Please select a wallet.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }
    if (!Recipientaddress || !amount) {
      toast({
        title: "Error",
        description: "Please enter both recipient address and an amount.",
        variant: "destructive",
      })
      return
    }
    const solAmount = parseSolAmount(amount);
    if (solAmount === null) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive SOL amount.",
        variant: "destructive",
      });
      return;
    }
    const transaction = new Transaction();
    transaction.add(SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: new PublicKey(Recipientaddress),
      lamports: solAmount * LAMPORTS_PER_SOL,
  }));
  try{
    setLoading(true);
    const res = await wallet.sendTransaction(transaction, connection);
    // console.log("RES: ", res);
    // console.log(`Airdropping ${amount} SOL to ${Recipientaddress}`)
    toast({
      title: "Airdrop Initiated",
      description: `Airdropping ${amount} SOL to ${Recipientaddress}`,
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
   <div className="mt-16">
     {
        loading && (
          <div className="w-full max-w-md mx-auto my-auto flex justify-center">
            <div className='spinner '></div>
          </div>
        )
      }
     {
      !loading &&(
        <div className="w-full max-w-md mx-auto">
          <Card className="shadow-lg shadow-gray-50">
      <CardHeader>
        <CardTitle>Send Solana</CardTitle>
        <CardDescription>Enter recipient address to transfer solana</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="address">Recipient address</Label>
          <Input
            id="address"
            placeholder="Enter wallet public address"
            value={Recipientaddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </div>
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
        <Button className="w-full" onClick={handleSend}>
          Send SOL
        </Button>
      </CardFooter>
    </Card>
    <CardFooter className="flex justify-center mt-3 text-2xl cursor-pointer">
     <TiArrowBack onClick={()=>navigate('/')} title="Back to Home" />
     </CardFooter>
        </div>
      )
     }
   </div>
  )
}
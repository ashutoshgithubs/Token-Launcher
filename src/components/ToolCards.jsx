import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';

export default function ToolCards() {
    const navigate = useNavigate();
    const { connected } = useWallet(); 
    function handleAirdrop(){
        if(!connected){
            alert("Please connect your wallet")
            navigate("/");
        }
        else{
            navigate("/airdrop-solana")
        }
    }
    function handleSendSolana(){
        if(!connected){
            alert("Please connect your wallet")
            navigate("/");
        }
        else{
            navigate("/send-solana")
        }
    }

    function handleGenerateToken(){
        if(!connected){
            alert("Please connect your wallet")
            navigate("/");
        }
        else{
            navigate("/geretate-token")
        }
    }
  return (
   
      <div id="tools" className=" max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">Solana Tools</h1>
                        <p className="text-xl">Create, launch, and manage your own Solana tokens</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Airdrop Solana Card */}
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Airdrop Solana</CardTitle>
                                <CardDescription>Request free SOL tokens for testing & development on devnet/testnet to cover txn fee</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={handleAirdrop}>Get Started</Button>
                            </CardContent>
                        </Card>

                        <Card className="">
                            <CardHeader>
                                <CardTitle>Generate Token</CardTitle>
                                <CardDescription>Create Your Own Solana Token with Personalized Metadata</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={handleGenerateToken}>Get Started</Button>
                            </CardContent>
                        </Card>

                        <Card className="">
                            <CardHeader>
                                <CardTitle>Send Solana</CardTitle>
                                <CardDescription>Send SOL to Any Wallet with ease</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={handleSendSolana}>Get Started</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
    
  )
}

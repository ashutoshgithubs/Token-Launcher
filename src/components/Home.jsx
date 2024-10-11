import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {
    const navigate = useNavigate();
    const { connected } = useWallet(); 

    return (
        <div className="min-h-screen p-8">
            {/* <div className="flex justify-center mb-8">
                <WalletMultiButton />
            </div> */}

            {!connected ? (
                <div className="my-auto text-center">
                    <h1 className="text-3xl font-bold mb-4">Select Wallet</h1>
                    <p className="text-xl">Please connect your wallet to access the Solana Token Launchpad.</p>
                </div>
            ) : (
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-5xl font-bold mb-4">Solana Token Launchpad</h1>
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
                                <Button onClick={() => navigate('/airdrop')}>Get Started</Button>
                            </CardContent>
                        </Card>

                        {/* Generate Token Card */}
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Generate Token</CardTitle>
                                <CardDescription>Create Your Own Solana Token with Personalized Metadata</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => navigate('/generateToken')}>Get Started</Button>
                            </CardContent>
                        </Card>

                        {/* Send Solana Card */}
                        <Card className="">
                            <CardHeader>
                                <CardTitle>Send Solana</CardTitle>
                                <CardDescription>Send SOL to Any Wallet with ease</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => navigate('/send')}>Get Started</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

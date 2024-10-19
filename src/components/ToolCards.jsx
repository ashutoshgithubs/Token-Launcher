import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

export default function ToolCards() {
    const navigate = useNavigate();
    const { connected } = useWallet();
    const [isSmallScreen, setIsSmallScreen] = useState(false);

  
    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768); 
        };

        handleResize(); 
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function handleAirdrop() {
        if (!connected) {
            alert("Please connect your wallet");
            navigate("/");
        } else {
            navigate("/airdrop-solana");
        }
    }

    function handleSendSolana() {
        if (!connected) {
            alert("Please connect your wallet");
            navigate("/");
        } else {
            navigate("/send-solana");
        }
    }

    function handleGenerateToken() {
        if (!connected) {
            alert("Please connect your wallet");
            navigate("/");
        } else {
            navigate("/generate-token");
        }
    }

    function handleViewTokens() {
        if (!connected) {
            alert("Please connect your wallet");
            navigate("/");
        } else {
            navigate("/view-tokens");
        }
    }

    function handleLiquidity() {
        if (!connected) {
            alert("Please connect your wallet");
            navigate("/");
        } else {
            alert("This feature is under development. It will be available soon!");
        }
    }

    const cards = [
        {
            title: "Airdrop Solana",
            description: "Request free SOL for testing & development",
            action: handleAirdrop,
        },
        {
            title: "Generate Token",
            description: "Create Solana Token with Personalized Metadata",
            action: handleGenerateToken,
        },
        {
            title: "Send Solana",
            description: "Send SOL to Any Wallet with ease",
            action: handleSendSolana,
        },
        {
            title: "View Tokens",
            description: "Tokens associated with the linked account.",
            action: handleViewTokens,
        },
        {
            title: "Liquidity Pools",
            description: "Contribute assets to facilitate trading.",
            action: handleLiquidity,
        }
    ];

    return (
        <div id="tools" className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Solana Tools</h1>
                <p className="text-xl">Create, launch, and manage your own Solana tokens</p>
            </div>

            {isSmallScreen ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className="mySwiper"
                >
                    {cards.map((card, index) => (
                        <SwiperSlide key={index}>
                            <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 shadow-slate-400 hover:scale-105">
                                <CardHeader>
                                    <CardTitle>{card.title}</CardTitle>
                                    <CardDescription>{card.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Button onClick={card.action}>Get Started</Button>
                                </CardContent>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
        
                <div className="grid grid-cols-3 gap-6">
                    {cards.map((card, index) => (
                        <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-300 shadow-slate-400 hover:scale-105">
                            <CardHeader>
                                <CardTitle>{card.title}</CardTitle>
                                <CardDescription>{card.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={card.action}>Get Started</Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

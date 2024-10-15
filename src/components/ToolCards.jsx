import React from 'react';
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

    return (
        <div id="tools" className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Solana Tools</h1>
                <p className="text-xl">Create, launch, and manage your own Solana tokens</p>
            </div>

    
            <Swiper
    slidesPerView={3}
    spaceBetween={30}
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
    breakpoints={{
        // When the screen width is 640px or smaller, show 1 slide per view
        0: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        // When the screen width is 768px or larger, show 2 slides per view
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        // When the screen width is 1024px or larger, show 3 slides per view
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
    }}
>
    <SwiperSlide>
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 shadow-slate-400 hover:scale-105">
            <CardHeader>
                <CardTitle>Airdrop Solana</CardTitle>
                <CardDescription>Request free SOL for testing & development</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleAirdrop}>Get Started</Button>
            </CardContent>
        </Card>
    </SwiperSlide>

    <SwiperSlide>
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 shadow-slate-400 hover:scale-105">
            <CardHeader>
                <CardTitle>Generate Token</CardTitle>
                <CardDescription>Create Solana Token with Personalized Metadata</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleGenerateToken}>Get Started</Button>
            </CardContent>
        </Card>
    </SwiperSlide>

    <SwiperSlide>
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 shadow-slate-400 hover:scale-105">
            <CardHeader>
                <CardTitle>Send Solana</CardTitle>
                <CardDescription>Send SOL to Any Wallet with ease</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleSendSolana}>Get Started</Button>
            </CardContent>
        </Card>
    </SwiperSlide>

    <SwiperSlide>
        <Card className="shadow-sm hover:shadow-md transition-shadow duration-300 shadow-slate-400 hover:scale-105">
            <CardHeader>
                <CardTitle>View Tokens</CardTitle>
                <CardDescription>Tokens associated with the linked account.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={handleViewTokens} >Get Started</Button>
            </CardContent>
        </Card>
    </SwiperSlide>
</Swiper>

        </div>
    );
}

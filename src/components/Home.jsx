import React from 'react';
import {  CardFooter } from './ui/card';
import '@solana/wallet-adapter-react-ui/styles.css';
import HeroSection from './HeroSection';
import SuperSection from './SuperSection';
import Footer from './Footer';
import BuyCoffee from './BuyCoffee';
import ToolCards from './ToolCards';
import FaqSection from './FaqSection';
import Contact from './Contact';

export default function Home() {
    
    return (
        <div className="min-h-screen p-8">
         
                <SuperSection/>
                <HeroSection/>
                <ToolCards/>
                <BuyCoffee/>
                <FaqSection/>
                <Contact/>
                <CardFooter>
                    <Footer/>
                </CardFooter> 
               
                
            {/* )} */}
        </div>
    );
}

import React from 'react'
import Banner from "../assets/solvdo - Trim.mp4";
import placeholderImage from "../assets/sol.jpeg"
export default function SuperSection() {
  return (
    <div className="hero-section py-10 px-8">
        
    <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">
      <div className="lg:w-1/2 text-center lg:text-left space-y-6">
      
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">
          Solana Token <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                     Launchpad{" "}
                    </span>
        </h1>
        <p className="text-xl lg:text-xl">
          Create, launch, and manage your own Solana tokens with ease. 
          Experience the speed, security, and scalability of the Solana blockchain.
        </p>
        <p className="text-md">
          Take your project to the next level. Unlock the potential of Web3 by launching your custom tokens on Solana’s powerful network!
        </p>
      </div>

      <div className="lg:w-1/2 mt-10 lg:mt-0">
          <div className="mx-3 my-12 shadow-[0_0_30px_0] shadow-[#0C6A87]border rounded-3xl relative">
          <video muted loop autoPlay preload="auto" poster={placeholderImage} className="border rounded-3xl">
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  </div>
  )
}

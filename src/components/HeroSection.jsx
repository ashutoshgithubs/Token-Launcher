import React from 'react'
import CodeBlock from './CodeBlock'

export default function HeroSection() {
  return (
    <div>
        <CodeBlock
            position={"flex flex-col p-4 md:flex-row "}
            heading={
              <>
                {/* <div className="hidden md:block text-4xl font-semibold ">
                  <div className="flex gap-2">
                    Unlock Your 
                  </div>
                  with our online courses
                </div> */}
                {/* From Idea to Token: Fast, Secure, and Decentralized */}
                <div className="w-full ">
                  <p className="text-3xl font-semibold gap-2">
                    From Idea to Token: Secure, and Decentralized: {" "}
                    <span className="bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text font-bold">
                    Solana Token Launchpad{" "}
                    </span>
                   
                  </p>
                </div>
              </>
            }
            subheading={
              "Seamlessly mint and manage Solana tokens—crafted for innovators and dreamers alike."
            }
            
            // 2nd part
            codeColor={"text-yellow-25"}
            codePart={`import nacl from "tweetnacl";
            import { mnemonicToSeedSync } from "bip39";
            import { derivePath } from "ed25519-hd-key";
            import { Keypair } from "@solana/web3.js";
            const seed = mnemonicToSeedSync(mnemonic);
            const path = m/44'/501'/1'/0';
            const derivedSeed = derivePath(path, seed.toString("hex")).key;
            const privateKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
            Keypair.fromSecretKey(privateKey).publicKey.toBase58();
          `}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
          
    </div>
  )
}

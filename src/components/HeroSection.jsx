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
            import {Helmet} from "react-helmet";
            import {Transaction} from "@solana/web3.js"
            import {pack} from "@solana/spl-token-metadata"
            const wallet = useWallet();
            const {connection} = useConnection();
            const address = wallet.publicKey;
            const navigate = useNavigate();
            const path = m/44'/501'/1'/0';
            const connected = wallet.connected;
            
          `}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
          
    </div>
  )
}

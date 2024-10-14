import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "./ui/accordion"
  
  export default function FaqSection() {
    const faqs = [
      {
        question: "What is Solana?",
        answer: "Solana is a high-performance blockchain platform designed for decentralized applications and cryptocurrencies. It offers fast transaction speeds, low fees, and scalability."
      },
      {
        question: "How do I create a Solana wallet?",
        answer: "To create a Solana wallet, you can use popular options like Phantom, Solflare, or Sollet. Visit their websites, download the browser extension or mobile app, and follow the setup instructions to create your wallet."
      },
      {
        question: "What is SPL token?",
        answer: "SPL (Solana Program Library) token is a type of digital asset on the Solana blockchain. SPL tokens are similar to ERC20 tokens on Ethereum blockchain, as they have specific methods for token management, like transferring, minting etc."
      },
      {
        question: "What is Solana Token Creator?",
        answer: "Solana Token Creator is a dapp that allows you to create and mint your own SPL tokens without coding. You just need customize metadata, name, symbol, logo and enter supply."
      },
      {
        question: "How to use Solana Token Creator?",
        answer: "Step 1. Connect your Solana wallet and select network (mainnet, devnet or testnet). This wallet will have authority to mint. Step 2. Enter information about your SPL token (token name, symbol, decimals, logo, supply) Step 3. Press 'Create token' button and confirm transaction. Congratulations! Your token is created and supply is transferred to your wallet"
      },
      {
        question: "What are Solana's transaction fees?",
        answer: "Solana's transaction fees are very low compared to many other blockchains. As of 2024, the average transaction fee is less than $0.01, making it cost-effective for frequent transactions and microtransactions."
      },
      
      {
        question: "Can I try Solana Token Generator for free?",
        answer: "Yes. You can create any number of SPL tokens for free on solana devnet or testnet"
      }
    ]
  
    return (
      <div id="faq" className="w-full max-w-3xl mx-auto p-6 mt-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    )
  }
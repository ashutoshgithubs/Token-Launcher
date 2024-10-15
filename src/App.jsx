import { useState, useRef, useEffect } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import GenerateToken from './components/GenerateToken';
import Airdrop from './components/Airdrop';
import Send from './components/Send';
import ToggleTheme from './components/ToggleTheme';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import logo from './assets/logo.png';
import '@solana/wallet-adapter-react-ui/styles.css';
import NotFound from './components/NotFound';
import Balance from './components/Balance';
import Home from './components/Home';
import LaunchFuel from './components/LaunchFuel';
import ViewTokens from './components/ViewTokens';
import {Helmet} from "react-helmet";

function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const location = useLocation();  

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      isDropdownOpen &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const endpoints = import.meta.env.VITE_ENDPOINT;
  
  return (
    <ConnectionProvider endpoint={endpoints}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="w-screen min-h-screen flex flex-col">

              {/* HELMET */}

            <Helmet>
              
              <title>SOL Token Launchpad | Create and Launch Solana Tokens Easily</title>
              <meta name="description" content="Launch your own Solana tokens effortlessly using our SOL Token Launchpad. Secure, fast, and decentralized Web3 platform." />
              <meta name="keywords" content="Solana, Token Launchpad, Web3, Blockchain, Token Creation, Cryptocurrency" />
              <meta name="author" content="Ashutosh Kumar" />
              <meta property="og:title" content="SOL Token Launchpad - Create and Launch Solana Tokens" />
              <meta property="og:description" content="Easily create and launch Solana tokens on our secure Web3 token platform." />
              <meta property="og:image" content="https://i.ibb.co/fXCNCCh/SOLANA-TOKEN.png" />
              <meta property="og:url" content="https://launchpadsolana-tokens.vercel.app/" />
              <meta property="og:type" content="website" />
              <meta name="twitter:card" content="summary_large_image" />
              <meta name="twitter:title" content="SOL Token Launchpad - Solana Token Creation" />
              <meta name="twitter:description" content="Launch your Solana tokens with our easy-to-use Web3 platform." />
              <meta name="twitter:image" content="https://i.ibb.co/fXCNCCh/SOLANA-TOKEN.png" />
              <meta name="robots" content="index, follow" />
              <link rel="canonical" href="https://launchpadsolana-tokens.vercel.app/" />
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "name": "SOL Token Launchpad",
                  "url": "https://launchpadsolana-tokens.vercel.app/",
                  "description": "Launch Solana tokens securely and quickly with our decentralized Web3 platform."
                })}
              </script>
            </Helmet>


            {/* NAVBAR */}
            <nav className="fixed top-0 left-0 w-full flex h-16 items-center justify-center bg-gray-900 shadow-yellow-50 shadow-2xl z-50">
              <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                
             
                <Link to="/">
                  <img src={logo} className="h-16 hidden md:flex" alt="Logo" />
                </Link>
                
                {/* Let's make a Hamburger for Mobile View */}
                <button
                  ref={buttonRef}
                  className="block md:hidden focus:outline-none text-white"
                  onClick={toggleDropdown}
                  aria-label="Toggle navigation menu"
                  aria-expanded={isDropdownOpen}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </button>

                <div className="hidden md:flex gap-x-6">
                  <Link to="/" className="hover:text-indigo-400 transition-colors text-white">Home</Link>
                  {location.pathname === "/" && ( 
                    <>
                      <a href="#tools" className="hover:text-indigo-400 transition-colors text-white">Tools</a>
                      <a href="#support" className="hover:text-indigo-400 transition-colors text-white">Fuel my Rocket</a>
                      <a href="#faq" className="hover:text-indigo-400 transition-colors text-white">FAQs</a>
                    </>
                  )}
                </div>

                <div className="flex space-x-4 items-center">
                  <WalletMultiButton className="wallet-button" />
                  <Balance />
                  <ToggleTheme a="hidden" b="flex" />
                </div>
              </div>

              {isDropdownOpen && (
                <div ref={dropdownRef} className="absolute top-16 left-0 w-full bg-slate-600 md:hidden shadow-lg">
                  <div className="flex flex-col items-center space-y-4 py-4 font-semibold">
                    <Link to="/" className="hover:text-indigo-400 transition-colors text-white" onClick={() => setIsDropdownOpen(false)}>Home</Link>
                    {location.pathname === "/" && ( 
                      <>
                        <a href="#tools" className="hover:text-indigo-400 transition-colors text-white" onClick={() => setIsDropdownOpen(false)}>Tools</a>
                        <a href="#support" className="hover:text-indigo-400 transition-colors text-white" onClick={() => setIsDropdownOpen(false)}>Fuel my Rocket</a>
                        <a href="#faq" className="hover:text-indigo-400 transition-colors text-white" onClick={() => setIsDropdownOpen(false)}>FAQs</a>
                      </>
                    )}
                    <ToggleTheme a="flex" b="hidden" />
                  </div>
                </div>
              )}
            </nav>
            
            <div className="pt-20">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generate-token" element={<GenerateToken />} />
                <Route path="/airdrop-solana" element={<Airdrop />} />
                <Route path="/send-solana" element={<Send />} />

                <Route path="/launch-fuel" element={<LaunchFuel />} />
                <Route path="/view-tokens" element={<ViewTokens />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;

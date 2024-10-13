import { useState, useRef, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import GenerateToken from './components/GenerateToken';
import Airdrop from './components/Airdrop';
import Send from './components/Send';
import ToggleTheme from './components/ToggleTheme';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import logo from './assets/logo.png';
import { Star } from "lucide-react"
import '@solana/wallet-adapter-react-ui/styles.css';
import NotFound from './components/NotFound';
import Balance from './components/Balance';
import Home from './components/Home';
import LaunchFuel from './components/LaunchFuel';


function App() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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
          <div className="w-screen min-h-screen flex flex-col relative">
            {/* Adding stars in the bg */}
          {/* <div className="absolute inset-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <Star
                key={i}
                className="absolute animate-twinkle"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                }}
                size={Math.random() * 4 + 1}
              />
            ))}
        </div> */}
            {/* NAVBAR */}
           
            <nav className="fixed  top-0 left-0 w-full  flex h-16 items-center justify-center bg-gray-1000 shadow-yellow-50 shadow-2xl ">
              <div className=" flex w-11/12 max-w-maxContent items-center justify-between">
                
                {/* Logo */}
                <Link to="/">
                  <img src={logo} className="h-16 hidden md:flex" alt="Logo" />
                </Link>
                
                {/* Let's make a hamburger for Mobile view*/}
                <button
                  ref={buttonRef}
                  className="block md:hidden  focus:outline-none"
                  onClick={toggleDropdown}
                  aria-label="Toggle navigation menu"
                  aria-expanded={isDropdownOpen}
                >
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                  </svg>
                </button>

                <div className="hidden md:flex gap-x-6 ">
                  <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
                  <a href="#tools" className="hover:text-indigo-400 transition-colors">Tools</a>
                  <Link to="/buy-me-a-coffee" className="hover:text-indigo-400 transition-colors">Fuel my Rocket</Link>
                  <Link to="/faqs" className="hover:text-indigo-400 transition-colors">FAQs</Link>
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
                    <Link to="/" className="hover:text-indigo-400 transition-colors " onClick={() => setIsDropdownOpen(false)}>Home</Link>
                    <Link to="#tools" className="hover:text-indigo-400  transition-colors" onClick={() => setIsDropdownOpen(false)}>Tools</Link>
                    <Link to="/buy-me-a-coffee" className="hover:text-indigo-400 transition-colors " onClick={() => setIsDropdownOpen(false)}>Fuel my Rocket</Link>
                    <Link to="/faqs" className="hover:text-indigo-400  transition-colors" onClick={() => setIsDropdownOpen(false)}>FAQs</Link>
                    <ToggleTheme a="flex" b="hidden"/>
                  </div>
                </div>
              )}
            </nav>
            
            <div className="pt-20 ">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/generateToken" element={<GenerateToken />} />
                <Route path="/airdrop-solana" element={ <Airdrop />} />
                <Route path="/send-solana" element={<Send />} />
                <Route path="/launch-fuel" element={<LaunchFuel />} />
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

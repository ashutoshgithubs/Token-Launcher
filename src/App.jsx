import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import GenerateToken from './components/GenerateToken';
import Airdrop from './components/Airdrop';
import Send from './components/Send';
import ToggleTheme from './components/ToggleTheme';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';

import '@solana/wallet-adapter-react-ui/styles.css';
import NotFound from './components/NotFound';
// import { useMemo } from 'react';
// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { clusterApiUrl } from '@solana/web3.js';

function App() {
  
  // const network = WalletAdapterNetwork.Devnet;

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  return (
    <ConnectionProvider endpoint={""}>
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <div className="w-screen min-h-screen text-foreground flex flex-col items-between">
            <div className='w-full flex items-end'>
              <ToggleTheme />
            </div>
            <div className="flex justify-center mb-8 mt-8">
                <WalletMultiButton />
            </div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generateToken" element={<GenerateToken />} />
              <Route path="/airdrop-solana" element={<Airdrop />} />
              <Route path="/send-solana" element={<Send />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;

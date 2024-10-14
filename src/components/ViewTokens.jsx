import { useState, useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { getMint, getAccount, TOKEN_2022_PROGRAM_ID, getTokenMetadata } from "@solana/spl-token";
import { FaSpinner, FaCopy, FaExternalLinkAlt } from "react-icons/fa";
import { toast } from "@/hooks/use-toast";
import { Card } from "./ui/card";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";

export default function ViewTokens() {
  const [tokens, setTokens] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Address copied",
        description: "Token address copied to clipboard",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast({
        title: "Copy failed",
        description: "Failed to copy address to clipboard",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchTokens = async () => {
      if (!publicKey) return;

      setIsLoading(true);
      try {
        const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { programId: TOKEN_2022_PROGRAM_ID });
        const fetchedTokens = await Promise.all(
          tokenAccounts.value.map(async ({ pubkey }) => {
            try {
              const accountInfo = await getAccount(connection, pubkey, undefined, TOKEN_2022_PROGRAM_ID);
              const mintInfo = await getMint(connection, accountInfo.mint, undefined, TOKEN_2022_PROGRAM_ID);

              if (mintInfo.mintAuthority?.equals(publicKey)) {
                const metadata = await getTokenMetadata(connection, accountInfo.mint);
                if (metadata) {
                  let image = undefined;
                  if (metadata.uri) {
                    try {
                      const metadataJson = await fetch(metadata.uri).then((res) => res.json());
                      image = metadataJson.image;
                    } catch (error) {
                      console.error("Error fetching metadata JSON:", error);
                    }
                  }
                  return {
                    name: metadata.name,
                    symbol: metadata.symbol,
                    address: accountInfo.mint.toBase58(),
                    image: image,
                  };
                }
              }
            } catch (error) {
              console.error("Error fetching token info:", error);
            }
            return null;
          })
        );

        setTokens(fetchedTokens.filter((token) => token !== null));
      } catch (error) {
        console.error("Error fetching tokens:", error);
        alert("Failed to fetch tokens. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTokens();
  }, [publicKey, connection]);

  return (
    <div className="max-w-7xl mx-auto p-8 mb-20 mt-10">
      <h1 className="text-4xl font-bold text-center mb-12">My Token Collection</h1>

      {!publicKey ? (
        <div className="text-center rounded-lg p-8 shadow-sm">
          <p className="text-xl mb-4">Connect your wallet to view your tokens</p>
        </div>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
          <p className="text-xl">Fetching your tokens...</p>
        </div>
      ) : tokens.length > 0 ? (
        <div className="w-full my-8">
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
          >
            {tokens.map((token) => (
              <SwiperSlide key={token.address}>
                <Card
                  className="p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border shadow-slate-400 hover:scale-105"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-lg font-semibold">
                        {token.name} ({token.symbol})
                      </p>
                      <p className="text-sm mt-1">
                        {token.address.slice(0, 6)}...{token.address.slice(-4)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="hover:text-gray-800 transition-colors"
                        onClick={() => copyToClipboard(token.address)}
                      >
                        <FaCopy size={16} />
                      </button>
                      <a
                        href={`https://explorer.solana.com/address/${token.address}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-gray-800 transition-colors"
                      >
                        <FaExternalLinkAlt size={16} />
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={token.image}
                      alt={token.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <div className="text-center rounded-lg p-8 shadow-sm">
          <p className="text-xl">No tokens found for this account.</p>
        </div>
      )}
    </div>
  );
}

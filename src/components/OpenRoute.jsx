import { useWallet } from "@solana/wallet-adapter-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function OpenRoute({ children }) {
  const { connected } = useWallet();
  const navigate = useNavigate();

  if (!connected) {
    alert("Please connect your wallet");
    navigate("/");
    return null; // Prevent rendering children
  }
 else return children;
  
}
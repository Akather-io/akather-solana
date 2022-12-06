"use client";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";

const ConnectSolanaButton = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState(0);

  const getBalance = useCallback(() => {
    if (wallet.publicKey) {
      connection.getBalance(wallet.publicKey).then(setBalance);
    }
  }, [wallet, connection]);

  useEffect(() => {
    const interval = setInterval(getBalance, 15000);
    return () => clearInterval(interval);
  }, [wallet, getBalance]);

  return (
    <WalletMultiButton>
      {wallet.publicKey
        ? `${wallet.publicKey.toBase58().slice(0, 4)}...${wallet.publicKey
            .toBase58()
            .slice(-4)} (${(balance / LAMPORTS_PER_SOL).toFixed(2)} SOL)`
        : "Connect Wallet"}
    </WalletMultiButton>
  );
};

export default ConnectSolanaButton;

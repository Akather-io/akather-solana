import { BN, web3 } from "@project-serum/anchor";

import { PROGRAM_ADDRESS } from "@metaplex-foundation/mpl-token-metadata";
import { ComputeBudgetProgram, Connection } from "@solana/web3.js";
import {
  bundlrStorage,
  Metaplex,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { Wallet } from "@solana/wallet-adapter-react";
import { WalletAdapter } from "@solana/wallet-adapter-base";

export const TOKEN_METADATA_PROGRAM_ID = new web3.PublicKey(PROGRAM_ADDRESS);

export const getMetadata = (mint: web3.PublicKey): web3.PublicKey => {
  const [account] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  return account;
};
export const getMasterEdition = (mint: web3.PublicKey): web3.PublicKey => {
  const [account] = web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("metadata"),
      TOKEN_METADATA_PROGRAM_ID.toBuffer(),
      mint.toBuffer(),
      Buffer.from("edition"),
    ],
    TOKEN_METADATA_PROGRAM_ID
  );
  return account;
};

export const modifyComputeUnits = ComputeBudgetProgram.setComputeUnitLimit({
  units: 1000000,
});

export const addPriorityFee = ComputeBudgetProgram.setComputeUnitPrice({
  microLamports: 1,
});

export const formatAddress = (address: string | undefined) => {
  if (!address) return "Invalid address";
  address = address.toLowerCase();
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

export function GetMetaPlex(wallet: any, connection: Connection) {
  return Metaplex.make(connection)
    .use(walletAdapterIdentity(wallet))
    .use(
      bundlrStorage({
        address: "https://devnet.bundlr.network",
        providerUrl: "https://api.devnet.solana.com",
        timeout: 60000,
      })
    );
}

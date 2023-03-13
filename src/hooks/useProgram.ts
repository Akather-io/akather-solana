import { AKA_TOKEN_PROGRAM_ID, SolanaProgramEduIdl } from "@/utils/contants";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { IDL } from "../utils/solana_program_edu";

export function useProgram() {
  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();

  const [program, setProgram] = useState<Program<SolanaProgramEduIdl>>();

  useEffect(() => {
    if (publicKey && connection && signTransaction && signAllTransactions) {
      // const anchorWallet = new W/allet();
      const provider = new AnchorProvider(
        connection,
        {
          publicKey,
          signTransaction,
          signAllTransactions,
        },
        {
          commitment: "confirmed",
          skipPreflight: true,
        }
      );
      const program = new Program<SolanaProgramEduIdl>(
        IDL,
        AKA_TOKEN_PROGRAM_ID,
        provider
      );
      setProgram(program);
    }
  }, [connection, publicKey, signTransaction, signAllTransactions]);
  return program;
}

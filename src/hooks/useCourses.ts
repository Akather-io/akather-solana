import { AKA_TOKEN_PROGRAM_ID, SolanaProgramEduIdl } from "@/utils/contants";
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { IDL } from "../utils/solana_program_edu";

export default function useCourses() {
  const { connection } = useConnection();
  const { publicKey, signTransaction, signAllTransactions } = useWallet();

  const [program, setProgram] = useState<Program<SolanaProgramEduIdl>>();

  useEffect(() => {
    const provider = new AnchorProvider(
      connection,
      // @ts-ignore
      null,
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
  }, [connection, publicKey, signTransaction, signAllTransactions]);
  return program;
}

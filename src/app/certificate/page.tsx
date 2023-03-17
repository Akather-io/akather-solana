"use client";
import CertCard from "@/components/Course/CertCard";
import Container from "@/components/_UI/Container";
import { useProgram } from "@/hooks/useProgram";
import { BN, ProgramAccount, web3 } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import { encode } from "bs58";
import { useCallback, useEffect, useState } from "react";

export default function CertificatePage() {
  const { connection } = useConnection();
  const program = useProgram();
  const wallet = useWallet();
  const [certificates, setCertificates] = useState<ProgramAccount[]>([]);

  const handleGetCertificates = useCallback(async () => {
    if (!program || !wallet.publicKey) return;
    try {
      const enrollments = await program.account.enrollment.all([
        {
          memcmp: {
            offset: 8 + 32,
            bytes: encode(new PublicKey(wallet.publicKey).toBuffer()),
          },
        },
      ]);

      const issuedCertificates = enrollments.filter(
        (enrollment) => !enrollment.account.issuedAt.eq(new BN(0))
      );

      setCertificates(issuedCertificates);
    } catch (error) {
      console.log(error);
    }
  }, [program, wallet.publicKey]);

  useEffect(() => {
    handleGetCertificates();
  }, [connection, handleGetCertificates, wallet]);

  if (!wallet.publicKey) {
    return (
      <div className="h-[400px] w-full flex items-center justify-center">
        <span className="text-[32px]">Please connect your wallet</span>
      </div>
    );
  }

  return (
    <Container>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 py-14">
        {certificates.map((item) => (
          <CertCard
            key={item.publicKey.toBase58()}
            courseKey={item.account.course.toString()}
          />
        ))}
      </div>
    </Container>
  );
}

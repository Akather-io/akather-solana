import { formatAddress, GetMetaPlex } from "@/utils/spl.utils";
import { BN, Wallet, web3 } from "@project-serum/anchor";
import Image from "next/image";
import IconSvgShop from "../_Icons/IconSvgShop";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import EnrollButton from "./EnrollButton";
import useCourses from "@/hooks/useCourses";
import {
  AKA_TOKEN_PROGRAM_ID,
  CERT_SEED,
  ENROLLMENT_SEED,
} from "@/utils/contants";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

type Props = {
  courseKey: string;
};

export default function CertCard({ courseKey }: Props) {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [certificate, setCertificate] = useState<any>();

  const handleGetCertificate = useCallback(async () => {
    if (!courseKey || !wallet || !wallet.publicKey) return;
    try {
      const [enrollmentAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(ENROLLMENT_SEED),
          new web3.PublicKey(courseKey).toBuffer(),
          wallet?.publicKey.toBuffer(),
        ],
        AKA_TOKEN_PROGRAM_ID
      );

      const [certAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(CERT_SEED),
          new web3.PublicKey(courseKey).toBuffer(),
          enrollmentAccount.toBuffer(),
        ],
        AKA_TOKEN_PROGRAM_ID
      );

      const metaplex = GetMetaPlex(wallet, connection);

      const { json, address } = await metaplex.nfts().findByMint({
        mintAddress: certAccount,
      });

      setCertificate({ ...json, address });

      console.log({ certAccount: certAccount.toString() });
    } catch (error) {
      console.log(error);
    }
  }, [connection, courseKey, wallet]);

  useEffect(() => {
    handleGetCertificate();
  }, [handleGetCertificate]);

  if (!certificate) return null;

  return (
    <Link
      href={`https://solscan.io/token/${certificate.address}?cluster=devnet`}
      target="_blank"
      className="bg-[#F4F5FF] rounded-[20px] flex flex-col w-full shadow-md"
    >
      <div className="relative">
        <Image
          src={certificate.image}
          width={400}
          height={310}
          alt=""
          quality={100}
          className="w-full h-full rounded-[23px]"
        />
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center w-full">
          <h2 className="text-black font-semibold text-[16px] truncate w-full">
            {certificate.name}
          </h2>
        </div>
      </div>
    </Link>
  );
}

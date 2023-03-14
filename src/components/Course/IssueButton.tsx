import { useProgram } from "@/hooks/useProgram";
import {
  AKA_TOKEN_PROGRAM_ID,
  CERTIFICATE_IMAGE,
  CERT_SEED,
  ENROLLMENT_SEED,
} from "@/utils/contants";
import {
  TOKEN_METADATA_PROGRAM_ID,
  addPriorityFee,
  getMasterEdition,
  getMetadata,
  modifyComputeUnits,
} from "@/utils/spl.utils";
import {
  Metaplex,
  PublicKey,
  bundlrStorage,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { web3 } from "@project-serum/anchor";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { encode } from "bs58";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  courseAccount: string;
  courseName: string;
};

const IssueButton = ({ courseAccount, courseName }: Props) => {
  const { connection } = useConnection();
  const [nftController, setNftController] = useState<Metaplex>();
  const wallet = useWallet();
  const program = useProgram();
  const [isEnrolled, setIsEnrolled] = useState(true);

  const handleIssueCertificate = useCallback(async () => {
    try {
      if (!nftController || !wallet.publicKey) {
        toast("Wallet is not connected!", { type: "error" });
        return;
      }

      const [enrollmentAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(ENROLLMENT_SEED),
          new PublicKey(courseAccount).toBuffer(),
          wallet.publicKey.toBuffer(),
        ],
        AKA_TOKEN_PROGRAM_ID
      );

      console.log({ enrollmentAccount });

      const { uri } = await nftController.nfts().uploadMetadata({
        name: `Certificate of course ${courseName}`,
        description: `Issue for ${wallet.publicKey.toString()}`,
        image: CERTIFICATE_IMAGE,
      });

      const [certAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(CERT_SEED),
          new PublicKey(courseAccount).toBuffer(),
          new PublicKey(enrollmentAccount).toBuffer(),
        ],
        AKA_TOKEN_PROGRAM_ID
      );

      const tokenAccount = getAssociatedTokenAddressSync(
        certAccount,
        wallet.publicKey
      );

      const metadataAccount = getMetadata(certAccount);
      const masterEditionAccount = getMasterEdition(certAccount);

      const tx = await program?.methods
        .issueCert(uri)
        .accounts({
          certificate: certAccount,
          course: new PublicKey(courseAccount),
          enrollment: new PublicKey(enrollmentAccount),
          authority: wallet.publicKey,
          tokenAccount: tokenAccount,
          metadata: metadataAccount,
          masterEdition: masterEditionAccount,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        })
        .preInstructions([modifyComputeUnits, addPriorityFee])
        .rpc();
      toast("Certificate issued!", { type: "success" });
    } catch (error) {
      console.log(error);
      toast("Something went wrong!", { type: "error" });
    }
  }, [
    courseAccount,
    courseName,
    nftController,
    program?.methods,
    wallet.publicKey,
  ]);

  const handleCheckEnrolled = useCallback(async () => {
    if (!program || !wallet.publicKey) return;
    try {
      const [enrollment] = await program.account.enrollment.all([
        {
          memcmp: {
            offset: 8,
            bytes: encode(new PublicKey(courseAccount).toBuffer()),
          },
        },
        {
          memcmp: {
            offset: 8 + 32,
            bytes: encode(wallet.publicKey.toBuffer()),
          },
        },
      ]);
      const isEnrolled = !!enrollment;
      setIsEnrolled(isEnrolled);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [courseAccount, program, wallet.publicKey]);

  useEffect(() => {
    setNftController(
      Metaplex.make(connection)
        .use(walletAdapterIdentity(wallet))
        .use(
          bundlrStorage({
            address: "https://devnet.bundlr.network",
            providerUrl: "https://api.devnet.solana.com",
            timeout: 60000,
          })
        )
    );
    handleCheckEnrolled();
  }, [connection, handleCheckEnrolled, wallet]);

  if (!isEnrolled) return null;
  return (
    <button
      onClick={handleIssueCertificate}
      className="flex flex-row text-sky-400 justify-center items-center gap-2 border-2 border-sky-400 px-4 py-2 rounded-full cursor-pointer"
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13.4004 1.39996H5.00039C3.01217 1.39996 1.40039 3.01174 1.40039 4.99996V17.0001C1.40039 18.9883 3.01217 20.6001 5.00039 20.6001H17.0004C18.9886 20.6001 20.6004 18.9883 20.6004 17.0001V10.4M19.4004 4.39996L11.0004 12.8L8.60039 10.4"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Claim Certificate
    </button>
  );
};

export default IssueButton;

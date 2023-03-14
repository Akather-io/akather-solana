import React, { useCallback, useEffect, useState } from "react";
import IconLoading from "../_Icons/IconLoading";
import { useProgram } from "@/hooks/useProgram";
import { useWallet } from "@solana/wallet-adapter-react";
import { AnchorError, web3 } from "@project-serum/anchor";
import {
  AKA_TOKEN_PROGRAM_ID,
  CARD_SEED,
  ENROLLMENT_SEED,
  TREASURER_SEED,
} from "@/utils/contants";
import { PublicKey } from "@metaplex-foundation/js";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import {
  TOKEN_METADATA_PROGRAM_ID,
  addPriorityFee,
  getMasterEdition,
  getMetadata,
  modifyComputeUnits,
} from "@/utils/spl.utils";
import { toast } from "react-toastify";
import { encode } from "bs58";
import clsx from "clsx";

type EnrollButtonProps = {
  courseAccount: string;
  creator: string;
  className?: string;
};

const EnrollButton: React.FC<EnrollButtonProps> = ({
  courseAccount,
  creator,
  className,
}) => {
  const [isEnrolling, setIsEnrolling] = useState<boolean>(false);
  const [isEnrolled, setIsEnrolled] = useState(true);
  const program = useProgram();
  const { publicKey } = useWallet();

  const handleCheckEnrolled = useCallback(async () => {
    if (!program || !publicKey) return;
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
            bytes: encode(new PublicKey(publicKey).toBuffer()),
          },
        },
      ]);
      const isEnrolled = !!enrollment;
      setIsEnrolled(isEnrolled);
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [courseAccount, program, publicKey]);

  const handleEnrollCourse = useCallback(async () => {
    if (!program || !publicKey || !creator) return;
    try {
      setIsEnrolling(true);
      const [cardAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(CARD_SEED),
          new PublicKey(courseAccount).toBuffer(),
          publicKey.toBuffer(),
        ],
        AKA_TOKEN_PROGRAM_ID
      );

      const [treasurerAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(TREASURER_SEED),
          new PublicKey(courseAccount).toBuffer(),
          new PublicKey(creator).toBuffer(),
        ],
        AKA_TOKEN_PROGRAM_ID
      );

      const [enrollmentAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(ENROLLMENT_SEED),
          new PublicKey(courseAccount).toBuffer(),
          publicKey.toBuffer(),
        ],
        AKA_TOKEN_PROGRAM_ID
      );

      const tokenAccount = getAssociatedTokenAddressSync(
        cardAccount,
        publicKey
      );
      const metadataAccount = getMetadata(cardAccount);
      const masterEditionAccount = getMasterEdition(cardAccount);
      const tx = await program.methods
        .enroll()
        .accounts({
          course: courseAccount,
          tokenAccount,
          metadata: metadataAccount,
          card: cardAccount,
          masterEdition: masterEditionAccount,
          enrollment: enrollmentAccount,
          authority: publicKey,
          systemProgram: web3.SystemProgram.programId,
          rent: web3.SYSVAR_RENT_PUBKEY,
          tokenProgram: TOKEN_PROGRAM_ID,
          associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          treasurer: treasurerAccount,
        })
        .preInstructions([modifyComputeUnits, addPriorityFee])
        .rpc();
      toast("Enroll course successfully", { type: "success" });
      handleCheckEnrolled();
    } catch (error) {
      if (error instanceof AnchorError) {
        if (error.error.errorCode.code == "ConstraintMintMintAuthority") {
          toast("You already enroll this course", { type: "error" });
        } else toast(error.error.errorMessage, { type: "error" });
        setIsEnrolling(false);
      }
    } finally {
      setIsEnrolling(false);
    }
  }, [courseAccount, creator, handleCheckEnrolled, program, publicKey]);

  useEffect(() => {
    handleCheckEnrolled();
  }, [handleCheckEnrolled]);

  if (isEnrolled) return <></>;

  return (
    <button
      onClick={handleEnrollCourse}
      disabled={isEnrolling}
      className={clsx(
        "btn border-0 px-4 gap-3 outline-none flex items-center justify-center rounded-full text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]",
        className
      )}
    >
      {isEnrolling ? (
        <IconLoading />
      ) : (
        <svg
          width="22"
          height="20"
          viewBox="0 0 22 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.94556 5.61048C8.52522 6.03081 8.52522 6.69903 8.94556 7.11937L10.9933 9.16714H1.07778C0.485 9.16714 0 9.65214 0 10.2449C0 10.8377 0.485 11.3227 1.07778 11.3227H10.9933L8.94556 13.3705C8.52522 13.7908 8.52522 14.459 8.94556 14.8794C9.36589 15.2997 10.0341 15.2997 10.4544 14.8794L14.3237 11.0101C14.744 10.5898 14.744 9.91081 14.3237 9.49048L10.4544 5.61048C10.0341 5.19014 9.36589 5.19014 8.94556 5.61048ZM19.4 17.7894H11.8556C11.2628 17.7894 10.7778 18.2744 10.7778 18.8671C10.7778 19.4599 11.2628 19.9449 11.8556 19.9449H19.4C20.5856 19.9449 21.5556 18.9749 21.5556 17.7894V2.70048C21.5556 1.51492 20.5856 0.544922 19.4 0.544922H11.8556C11.2628 0.544922 10.7778 1.02992 10.7778 1.6227C10.7778 2.21548 11.2628 2.70048 11.8556 2.70048H19.4V17.7894Z"
            fill="#F7F7F7"
          />
        </svg>
      )}
      Enroll
    </button>
  );
};

export default EnrollButton;

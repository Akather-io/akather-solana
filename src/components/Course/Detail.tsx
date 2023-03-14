"use client";

import Image from "next/image";
import CourseCreator from "./Creator";
import Tab from "./Tab";
import { useProgram } from "@/hooks/useProgram";
import { PublicKey } from "@metaplex-foundation/js";
import { BN, web3 } from "@project-serum/anchor";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  TOKEN_METADATA_PROGRAM_ID,
  addPriorityFee,
  formatAddress,
  getMasterEdition,
  getMetadata,
  modifyComputeUnits,
} from "@/utils/spl.utils";
import {
  AKA_TOKEN_PROGRAM_ID,
  CARD_SEED,
  COURSE_SEED,
  ENROLLMENT_SEED,
} from "@/utils/contants";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddressSync,
} from "@solana/spl-token";
import Link from "next/link";

type Props = {
  courseAccount: string;
};

const CourseDetail: React.FC<Props> = ({ courseAccount }) => {
  const [info, setInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const program = useProgram();
  const { publicKey } = useWallet();

  const handleEnrollCourse = useCallback(async () => {
    if (!program || !publicKey) return;
    try {
      const [cardAccount] = web3.PublicKey.findProgramAddressSync(
        [
          Buffer.from(CARD_SEED),
          new PublicKey(courseAccount).toBuffer(),
          publicKey.toBuffer(),
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
        })
        .preInstructions([modifyComputeUnits, addPriorityFee])
        .rpc();

      console.log(tx);
    } catch (error) {
      console.log(error);
    }
  }, [courseAccount, program, publicKey]);

  const getCourseInfo = useCallback(async () => {
    if (!program) return;
    try {
      setIsLoading(true);
      const course = await program.account.course.fetch(
        new PublicKey(courseAccount)
      );

      const { image } = await fetch(course.uri).then((res) => res.json());
      setInfo({ ...course, image });

      console.log(course);
    } catch (error) {
      toast("Course not found", { type: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [courseAccount, program]);

  useEffect(() => {
    getCourseInfo();
  }, [getCourseInfo]);

  if (isLoading) return <div>Loading...</div>;
  if (!info) return <div>Course not found</div>;

  return (
    <>
      <div className="flex">
        <Link
          href="/study"
          className="text-blue-400 text-md flex flex-row items-center gap-3 bg-blue-100 px-2 py-1 rounded-md decoration-blue-400 underline cursor-pointer"
        >
          <svg
            width="21"
            height="19"
            viewBox="0 0 21 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.2624 17.7998L16.9683 17.7998C17.5299 17.7998 18.0686 17.5786 18.4657 17.1847C18.8628 16.7909 19.0859 16.2568 19.0859 15.6998L19.0859 3.09981C19.0859 2.54285 18.8628 2.00871 18.4657 1.61488C18.0686 1.22106 17.5299 0.999806 16.9683 0.999806L13.2624 0.999805M12.9992 9.3998L0.999219 9.3998M0.999219 9.3998L5.58437 14.1998M0.999219 9.3998L5.58437 4.5998"
              stroke="#60a5fa"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Back to My I-Course
        </Link>
      </div>

      <div className="flex flex-col py-14 flex-1 gap-5 md:flex-row items-center">
        <div className="bg-[#F4F5FF] rounded-[20px] p-4 flex w-full md:w-auto">
          <Image
            src={info.image}
            width={510}
            height={310}
            alt=""
            quality={100}
            className=" h-full rounded-[23px]"
          />
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <div className="text-black font-semibold text-[18px] truncate w-full text-3xl">
            {info.name}
          </div>
          <div>{info.description}</div>
          <div className="font-medium">
            Author: {formatAddress(info?.creator.toBase58())}
          </div>
          <div className="font-medium">
            Instructor: {formatAddress(info?.instructor.toBase58())}
          </div>
          <div className="flex flex-row">
            <div className="w-20">
              <span className="text-lg">Field: </span>
            </div>
            <span className="text-lg text-orange-400">Biology </span>
          </div>
          <div className="flex flex-row">
            <div className="w-20">
              <span className="text-lg">Section: </span>
            </div>
            <span className="text-lg text-blue-400">Animal </span>
          </div>
          <div className="flex">
            <div className="text-xs inline-flex items-center font-bold leading-sm px-3 py-1 rounded-full bg-blue-500 text-white w-auto">
              High School
            </div>
          </div>
          <div className="flex">
            <button
              onClick={handleEnrollCourse}
              className="btn border-0 gap-3 outline-none flex items-center justify-center rounded-full text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]"
            >
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
              Enroll
            </button>
          </div>
        </div>
      </div>
      <Tab courseAccount={courseAccount} />
    </>
  );
};

export default CourseDetail;

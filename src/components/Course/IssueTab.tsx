"use client";
import { useProgram } from "@/hooks/useProgram";
import {
  AKA_TOKEN_PROGRAM_ID,
  CERT_SEED,
  CERTIFICATE_IMAGE,
} from "@/utils/contants";
import {
  addPriorityFee,
  formatAddress,
  getMasterEdition,
  getMetadata,
  modifyComputeUnits,
  TOKEN_METADATA_PROGRAM_ID,
} from "@/utils/spl.utils";
import {
  bundlrStorage,
  Metaplex,
  PublicKey,
  toBigNumber,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { AnchorError, BN, ProgramAccount, web3 } from "@project-serum/anchor";
import {
  Account,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddress,
  getAssociatedTokenAddressSync,
  getOrCreateAssociatedTokenAccount,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Transaction } from "@solana/web3.js";
import { encode } from "bs58";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
  courseAccount: string;
  courseName: string;
};

const IssueTab: React.FC<Props> = ({ courseAccount, courseName }) => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isIntrustructor, setIsIntrustructor] = useState<boolean>(false);
  const wallet = useWallet();
  const program = useProgram();

  const handleCompleteCourse = useCallback(
    async (account: any) => {
      if (!program || !wallet.publicKey) return;
      try {
        const tx = await program.methods
          .updateStudent()
          .accounts({
            enrollment: account.publicKey,
            authority: wallet.publicKey,
            course: new PublicKey(courseAccount),
            systemProgram: web3.SystemProgram.programId,
            rent: web3.SYSVAR_RENT_PUBKEY,
          })
          .rpc();
        console.log(tx);
      } catch (error) {
        if (error instanceof AnchorError) {
          console.log(error.message);
          toast(error.message, { type: "error" });
        }
      }
    },
    [program, wallet.publicKey, courseAccount]
  );

  const handleGetCourse = useCallback(async () => {
    if (!program || !courseAccount || !wallet.publicKey) return;
    const course = await program.account.course.fetch(
      new PublicKey(courseAccount)
    );
    if (course.instructor.toString() === wallet.publicKey.toString()) {
      setIsIntrustructor(true);
    }
  }, [program, courseAccount, wallet.publicKey]);

  const handleGetEnrollment = useCallback(async () => {
    if (!program || !courseAccount || !wallet.publicKey) return;
    const enrollments = await program.account.enrollment.all([
      {
        memcmp: {
          offset: 8,
          bytes: encode(new PublicKey(courseAccount).toBuffer()),
        },
      },
    ]);
    if (enrollments && enrollments.length > 0) {
      const temp = enrollments.map((en) => ({
        publicKey: en.publicKey.toString(),
        course: en.account.course.toString(),
        student: en.account.student.toString(),
        startDate: en.account.startDate.toNumber(),
        completionDate: en.account.completionDate?.toNumber() || null,
        issueAt: en.account.issuedAt?.toNumber() || null,
      }));
      setEnrollments(temp);
      console.log(temp);
    } else setEnrollments([]);
  }, [program, courseAccount, wallet.publicKey]);

  useEffect(() => {
    handleGetCourse();
    handleGetEnrollment();
  }, [handleGetCourse, handleGetEnrollment]);

  return (
    <div className="flex flex-1">
      <table className="table-auto w-full text-black">
        <thead className="bg-slate-200 h-10">
          <tr>
            <th className="text-left pl-5">List of Learners </th>
            <th className="text-center">Status</th>
            {isIntrustructor && <th className="text-center">Issue</th>}
          </tr>
        </thead>
        <tbody>
          {enrollments &&
            enrollments.map((item) => {
              return (
                <tr key={item.publicKey} className="border-b h-14">
                  <td className="text-left pl-5 h-14 flex flex-row items-center gap-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 37 37"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.09375 31.9067C5.68561 31.2438 9.66192 28.1209 11.6383 26.5814C12.3581 26.0207 13.2411 25.7192 14.1535 25.7192C16.3598 25.7192 20.6113 25.7192 22.8282 25.7192C23.7513 25.7192 24.6431 26.0336 25.3863 26.5811C27.9383 28.4611 30.3306 29.8619 32.9375 31.9067M8.1875 35H28.8125C32.2298 35 35 32.2298 35 28.8125V8.1875C35 4.77024 32.2298 2 28.8125 2H8.1875C4.77024 2 2 4.77024 2 8.1875V28.8125C2 32.2298 4.77024 35 8.1875 35ZM24.41 13.8113C24.41 10.6634 21.7526 8.09139 18.5 8.09139C15.2475 8.09139 12.59 10.6634 12.59 13.8113C12.59 16.9592 15.2475 19.5312 18.5 19.5312C21.7525 19.5312 24.41 16.9592 24.41 13.8113Z"
                        stroke="black"
                        strokeWidth="3"
                      />
                    </svg>
                    {formatAddress(item.student)}
                  </td>
                  <td
                    className={clsx(
                      "text-center font-bold",
                      !!item.completionDate ? "text-green-400" : "text-red-400"
                    )}
                  >
                    {!!item.completionDate
                      ? `${new Date(item.completionDate).toLocaleString()}`
                      : "Not Issued"}
                  </td>
                  <td className="text-center">
                    {isIntrustructor && (
                      <div
                        className={clsx(
                          item.issueAt ? "text-sky-400" : "text-slate-600",
                          "flex flex-row justify-center items-center gap-2 cursor-pointer"
                        )}
                      >
                        {item.issueAt ? "Issued" : "Issue"}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTab;

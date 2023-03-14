"use client";
import { useProgram } from "@/hooks/useProgram";
import { formatAddress } from "@/utils/spl.utils";
import {
  bundlrStorage,
  Metaplex,
  PublicKey,
  toBigNumber,
  walletAdapterIdentity,
} from "@metaplex-foundation/js";
import { BN, ProgramAccount } from "@project-serum/anchor";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { encode } from "bs58";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

const testData = [
  {
    id: "ETUPvv8dG1c6pKzUrN5ChRiqHnVDMq877iUbQWkgKHNp",
    issueName: "ETUPvv8dG1c6pKzUrN5ChRiqHnVDMq877iUbQWkgKHNp",
    status: "Issued",
    cer: "url",
  },
  {
    id: "4m25phywoCFxxLwKz8wAufPuGVFYaoemX32BioeHMALK",
    issueName: "4m25phywoCFxxLwKz8wAufPuGVFYaoemX32BioeHMALK",
    status: "Issued",
    cer: "url",
  },
];

type Props = {
  courseAccount: string;
};

const IssueTab: React.FC<Props> = ({ courseAccount }) => {
  const [nftController, setNftController] = useState<Metaplex>();
  const { connection } = useConnection();
  const [enrollments, setEnrollments] = useState<ProgramAccount[]>([]);
  const wallet = useWallet();
  const program = useProgram();

  const handleGetEnrollment = useCallback(async () => {
    if (!program || !courseAccount) return;
    const enrollments = await program.account.enrollment.all([
      {
        memcmp: {
          offset: 8,
          bytes: encode(new PublicKey(courseAccount).toBuffer()),
        },
      },
    ]);
    console.log(enrollments);

    setEnrollments(enrollments);
  }, [program, courseAccount]);

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
    handleGetEnrollment();
  }, [connection, handleGetEnrollment, wallet]);

  const handleIssue = useCallback(async () => {
    if (!nftController) {
      toast("Please fill all fields!", { type: "error" });
      return;
    }
    const metadata_uri =
      "https://arweave.net/Z9g_x9-21Zw6yvQNsguz6zjrS4GiU7G9XzIc7NkiAho";
    const { nft } = await nftController.nfts().create({
      uri: metadata_uri,
      name: "Certificate Mo Ech",
      sellerFeeBasisPoints: 100,
      symbol: "CAKA",
      maxSupply: toBigNumber(1),
    });
    console.log(
      `Token Mint: https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`
    );
  }, [nftController]);
  return (
    <div className="flex flex-1">
      <table className="table-auto w-full text-black">
        <thead className="bg-slate-200 h-10">
          <tr>
            <th className="text-left pl-5">List of Learners </th>
            <th className="text-center">Status</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.map((item, index) => {
            return (
              <tr key={item.publicKey.toString()} className="border-b h-14">
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
                  {formatAddress(item.account.student.toString())}
                </td>
                <td
                  className={clsx(
                    "text-center font-bold",
                    !item.account.completionDate
                      ? "text-green-400"
                      : "text-red-400"
                  )}
                >
                  {!!item.account.completionDate
                    ? item.account.completionDate
                    : "Not Issued"}
                </td>
                <td className="text-center">
                  {item.account.completionDate ? (
                    <div className="flex flex-row text-sky-400 justify-center items-center gap-2 cursor-pointer">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.9265 15.04L18.3996 18.4M9.39961 5.20001C11.3878 5.20001 12.9996 6.81178 12.9996 8.80001M17.2796 9.44001C17.2796 13.7699 13.7695 17.28 9.43961 17.28C5.1097 17.28 1.59961 13.7699 1.59961 9.44001C1.59961 5.11009 5.1097 1.60001 9.43961 1.60001C13.7695 1.60001 17.2796 5.11009 17.2796 9.44001Z"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Track Certificate
                    </div>
                  ) : (
                    <div className="flex justify-center items-center">
                      <div
                        onClick={handleIssue}
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
                        Issue now
                      </div>
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

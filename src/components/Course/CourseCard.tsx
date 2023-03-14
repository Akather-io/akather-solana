import { formatAddress } from "@/utils/spl.utils";
import { BN } from "@project-serum/anchor";
import Image from "next/image";
import IconSvgShop from "../_Icons/IconSvgShop";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useProgram } from "@/hooks/useProgram";
import { encode } from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@metaplex-foundation/js";
import EnrollButton from "./EnrollButton";

type Props = {
  courseKey: string;
};

export default function CourseCard({ courseKey }: Props) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any>({});
  const program = useProgram();

  const handleGetCourses = useCallback(async () => {
    if (!program) return;
    try {
      const course = await program?.account.course.fetch(courseKey);
      if (course) {
        const data = await fetch(course.uri).then((res) => res.json());

        setDetail({
          publicKey: courseKey,
          creator: course.creator.toBase58(),
          name: course.name,
          symbol: course.symbol,
          image: data.image,
          instructor: course.instructor.toBase58(),
          price: course.price.toNumber() / LAMPORTS_PER_SOL,
          createAt: course.createdAt.toNumber(),
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  }, [courseKey, program]);

  useEffect(() => {
    if (courseKey) {
      handleGetCourses();
    }
  }, [courseKey, handleGetCourses]);

  return (
    <div className="bg-[#F4F5FF] rounded-[20px] flex flex-col w-full shadow-md">
      <div className="relative">
        {detail.image && (
          <Image
            src={detail.image}
            width={310}
            height={310}
            alt=""
            quality={100}
            className="aspect-square w-full rounded-[23px]"
          />
        )}

        <div className="absolute right-8 top-4">
          <span className="gap-1 text-black bg-gray-200 border-none badge badge-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>{" "}
            200
          </span>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center w-full">
          <h2 className="text-black font-semibold text-[18px] truncate w-full">
            {detail.name}
          </h2>
          <span className="text-white bg-red-500 border-none badge badge-md">
            {detail.symbol}
          </span>
        </div>

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3">
            <div className="w-[50px] h-[50px] aspect-square min-w-0 rounded-[10px]">
              <Image
                src={`https://picsum.photos/50/50?random=${detail.creator}`}
                width={50}
                height={50}
                alt=""
                quality={100}
                className="aspect-square w-full rounded-[10px]"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[#27272b]/70 text-[14px]">
                {detail.createAt}
              </span>
              <span className="text-black">
                {formatAddress(detail.instructor)}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[#27272b]/70  text-[14px]">Price</span>
            <span className="text-[16px] font-semibold text-black">
              {detail.price} SOL
            </span>
          </div>
        </div>

        <div className="flex items-center pt-4">
          <EnrollButton courseAccount={courseKey} creator={detail.creator} />
          <Link href={`/study/${detail.publicKey}`}>
            <button className="btn border-[#27272B80] outline-none gap-2 rounded-full bg-[#F4F5FF]">
              More detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

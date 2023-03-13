import { formatAddress } from "@/utils/spl.utils";
import { BN } from "@project-serum/anchor";
import Image from "next/image";
import IconSvgShop from "../_Icons/IconSvgShop";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  course: any;
};

export default function CourseCard({ course }: Props) {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<any>(null);
  useEffect(() => {
    if (course) {
      setLoading(true);
      fetch(course.account.uri)
        .then((res) => res.json())
        .then((data) => {
          setDetail(data);
        });
    }
  }, [course]);

  return (
    <div className="bg-[#F4F5FF] rounded-[20px] p-4 space-y-4 flex flex-col w-full relative">
      <Image
        src={detail?.image}
        // src={`https://picsum.photos/310/310?random=${course.publicKey.toBase58()}`}
        width={310}
        height={310}
        alt=""
        quality={100}
        className="aspect-square w-full rounded-[23px]"
      />

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

      <div className="flex items-center w-full">
        <h2 className="text-black font-semibold text-[18px] truncate w-full">
          {course.account.name}
        </h2>
        <span className="text-white bg-red-500 border-none badge badge-md">
          PRO
        </span>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-3">
          <div className="w-[50px] h-[50px] aspect-square min-w-0 rounded-[10px]">
            <Image
              src={`https://picsum.photos/50/50?random=${course.publicKey.toBase58()}`}
              width={50}
              height={50}
              alt=""
              quality={100}
              className="aspect-square w-full rounded-[10px]"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-[#27272b]/70 text-[14px]">
              {new BN(course.account.createAt).toNumber()}
            </span>
            <span className="text-black">
              {formatAddress(course.account.instructor.toBase58())}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[#27272b]/70  text-[14px]">Price</span>
          <span className="text-[16px] font-semibold text-black">
            {new BN(course.account.price).toNumber()} SOL
          </span>
        </div>
      </div>

      <div className="flex space-x-[10px]">
        <button className="w-[calc(50%-5px)] btn border-0 outline-none flex items-center justify-center gap-2 rounded-full text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]">
          <IconSvgShop />
          Buy Now
        </button>
        <Link
          className="w-[calc(50%-5px)] "
          href={`/study/${course.publicKey}`}
        >
          <button className="btn border-[#27272B80] outline-none gap-2 rounded-full bg-[#F4F5FF]">
            More detail
          </button>
        </Link>
      </div>
    </div>
  );
}

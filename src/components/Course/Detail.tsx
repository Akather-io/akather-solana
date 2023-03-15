"use client";

import Image from "next/image";
import CourseCreator from "./Creator";
import Tab from "./Tab";
import { useProgram } from "@/hooks/useProgram";
import { PublicKey } from "@metaplex-foundation/js";
import { AnchorError, BN, web3 } from "@project-serum/anchor";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { formatAddress } from "@/utils/spl.utils";
import Link from "next/link";
import EnrollButton from "./EnrollButton";
import IssueButton from "./IssueButton";

type Props = {
  courseAccount: string;
};

const CourseDetail: React.FC<Props> = ({ courseAccount }) => {
  const [info, setInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const program = useProgram();
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

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
      if (error instanceof AnchorError) {
        console.log(error.message);

        toast(error.message, { type: "error" });
      }
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
        <div className="flex flex-col space-y-2">
          <div className="text-black font-semibold text-[28px] truncate w-full text-3xl">
            {info.name}
          </div>
          <div>{info.description}</div>
          <div className="font-medium">
            Author:
            <span className="text-black/50 pl-2">
              {formatAddress(info?.creator.toBase58())}
            </span>{" "}
          </div>
          <div className="font-medium">
            Instructor:{" "}
            <span className="text-black/50 pl-2">
              {formatAddress(info?.instructor.toBase58())}
            </span>{" "}
          </div>
          <div className="flex flex-row">
            <div className="w-20">
              <span className="text-lg ">Field: </span>
            </div>
            <span className="text-lg text-orange-400">Biology </span>
          </div>
          <div className="flex flex-row">
            <div className="w-20">
              <span className="text-lg ">Section: </span>
            </div>
            <span className="text-lg text-blue-400">Animal </span>
          </div>
          <div className="flex">
            <div className="text-xs inline-flex items-center font-bold leading-sm px-3 py-1 rounded-full bg-blue-500 text-white w-auto">
              High School
            </div>
          </div>
          <div className="pt-5 space-y-3">
            <EnrollButton
              courseAccount={courseAccount}
              creator={info.creator}
            />
            {isCompleted && (
              <div className="text-sm text-green-500">
                You have completed this course.
              </div>
            )}
            <IssueButton
              courseAccount={courseAccount}
              courseName={info.name}
              onCompleted={(val) => setIsCompleted(val.valueOf())}
            />
          </div>
        </div>
      </div>
      <Tab courseAccount={courseAccount} courseName={info.name} />
    </>
  );
};

export default CourseDetail;

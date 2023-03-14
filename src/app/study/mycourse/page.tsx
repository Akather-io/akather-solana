"use client";

import { useProgram } from "@/hooks/useProgram";
import { AKA_TOKEN_PROGRAM_ID, COURSE_SEED } from "@/utils/contants";
import { PublicKey } from "@metaplex-foundation/js";
import { web3 } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useState } from "react";
import { encode } from "bs58";

type Props = {};

const MyCourse = (props: Props) => {
  const program = useProgram();
  const { publicKey } = useWallet();

  const [listCourse, setListCourses] = useState<any[]>([]);

  const fetchCourses = useCallback(async () => {
    if (!program || !publicKey) return;
    try {
      const courses = await program.account.enrollment.all([
        {
          memcmp: {
            offset: 8 + 32,
            bytes: encode(publicKey.toBuffer()),
          },
        },
      ]);

      const listCourses = await Promise.all(
        courses.map(async (course) => {
          const info = await program.account.course.fetch(
            course.account.course
          );
          const enrollments = await program.account.enrollment.all([
            {
              memcmp: {
                offset: 8,
                bytes: encode(course.account.course.toBuffer()),
              },
            },
          ]);
          return { ...info, enrollments: enrollments.length };
        })
      );

      console.log(listCourses);

      setListCourses(listCourses);

      // const course = courses[0];
      // const enrollments = await program.account.enrollment.all([
      //   {
      //     memcmp: {
      //       offset: 8,
      //       bytes: encode(course.account.course.toBuffer()),
      //     },
      //   },
      // ]);
      // console.log(enrollments.length);
    } catch (error) {
      console.log(error);
    }
  }, [program, publicKey]);

  return (
    <div>
      <button onClick={fetchCourses}>Fetch Courses</button>
    </div>
  );
};

export default MyCourse;

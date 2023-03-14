"use client";

import { useProgram } from "@/hooks/useProgram";
import { AKA_TOKEN_PROGRAM_ID, COURSE_SEED } from "@/utils/contants";
import { PublicKey } from "@metaplex-foundation/js";
import { web3 } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import { encode } from "bs58";
import Container from "@/components/_UI/Container";
import Link from "next/link";
import CourseCard from "@/components/Course/CourseCard";
import { toast } from "react-toastify";
import CourseNavigate from "@/components/Course/CourseNavigate";

type Props = {};

const MyCourse = (props: Props) => {
  const program = useProgram();
  const { publicKey } = useWallet();

  const [listCourse, setListCourses] = useState<any[]>([]);

  const handleFetchCourses = useCallback(async () => {
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

      setListCourses(courses);

      // const listCourses = await Promise.all(
      //   courses.map(async (course) => {
      //     const info = await program.account.course.fetch(
      //       course.account.course
      //     );
      //     const enrollments = await program.account.enrollment.all([
      //       {
      //         memcmp: {
      //           offset: 8,
      //           bytes: encode(course.account.course.toBuffer()),
      //         },
      //       },
      //     ]);
      //     return { ...info, enrollments: enrollments.length };
      //   })
      // );

      // const course = courses[0];
      // const enrollments = await program.account.enrollment.all([
      //   {
      //     memcmp: {
      //       offset: 8,
      //       bytes: encode(course.account.course.toBuffer()),
      //     },
      //   },
      // ]);
    } catch (error) {
      console.log(error);
    }
  }, [program, publicKey]);

  useEffect(() => {
    handleFetchCourses();
  }, [handleFetchCourses]);

  return (
    <Container>
      <CourseNavigate />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 py-14">
        {listCourse.map((item, index) => (
          <CourseCard key={item} courseKey={item.account.course.toString()} />
        ))}
      </div>
    </Container>
  );
};

export default MyCourse;

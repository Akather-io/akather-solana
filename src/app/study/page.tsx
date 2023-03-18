"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Container from "../../components/_UI/Container";
import { ProgramAccount } from "@project-serum/anchor";
import CourseCard from "@/components/Course/CourseCard";
import CourseNavigate from "@/components/Course/CourseNavigate";
import useCourses from "@/hooks/useCourses";
import Link from "next/link";

export default function StudyPage() {
  const program = useCourses();

  const [courses, setCourses] = useState<ProgramAccount[]>([]);

  const handleGetProgram = useCallback(async () => {
    if (!program) return;
    try {
      const courses = await program?.account.course.all();
      if (courses) {
        setCourses(courses);
      }
    } catch (error) {
      console.log(error);
    }
  }, [program]);

  useEffect(() => {
    handleGetProgram();
  }, [handleGetProgram]);

  return (
    <Container>
      <CourseNavigate />

      <div className="text-end mt-2">
        <Link href="/study/course">
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Create Course
          </button>
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 py-14">
        {courses &&
          courses.map((item) => (
            <CourseCard
              key={item.publicKey.toBase58()}
              courseKey={item.publicKey.toString()}
            />
          ))}
      </div>
    </Container>
  );
}

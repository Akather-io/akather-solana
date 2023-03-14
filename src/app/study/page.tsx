"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import IconSvgShop from "../../components/_Icons/IconSvgShop";
import Container from "../../components/_UI/Container";
import { useProgram } from "@/hooks/useProgram";
import { BN, ProgramAccount } from "@project-serum/anchor";
import CourseCard from "@/components/Course/CourseCard";
import CourseNavigate from "@/components/Course/CourseNavigate";

export default function StudyPage() {
  const program = useProgram();

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
      <div className="bg-[#F4F5FF] rounded-[10px] p-5 grid lg:grid-cols-2 mt-10">
        <div className="grid lg:grid-cols-3">
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Field</div>
            <select
              className="w-full max-w-full bg-transparent select select-ghost text-[#FF8C00] -ml-3.5"
              defaultValue="B"
            >
              <option value="B">Medical</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Section</div>
            <select
              className="w-full max-w-full bg-transparent select select-ghost text-[#246FFF] -ml-3.5"
              defaultValue="A"
            >
              <option value="A">Anatomy</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Type</div>
            <select
              className="w-full max-w-full bg-transparent select select-ghost text-[#000000] -ml-3.5"
              defaultValue="12"
            >
              <option value="12">K12, University, Proffesional...</option>
            </select>
          </div>
        </div>
        <div className="flex items-end justify-around">
          <div className="space-y-4">
            <div className="text-black text-[19px] font-medium">Type</div>
            <input
              type="text"
              placeholder="Find I-course you want"
              className="w-full max-w-lg bg-transparent input input-bordered"
            />
          </div>
          <button className="btn border-0 outline-none flex items-center justify-center gap-2 rounded-[5px] text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]">
            Apply
          </button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 md:gap-6 lg:gap-8 py-14">
        {courses.map((item) => (
          <CourseCard
            key={item.publicKey.toBase58()}
            courseKey={item.publicKey.toString()}
          />
        ))}
      </div>
    </Container>
  );
}

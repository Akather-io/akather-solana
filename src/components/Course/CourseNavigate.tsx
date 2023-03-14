import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const CourseNavigate = (props: Props) => {
  const pathName = usePathname();

  const isCurrentPath = (path: string) => {
    return pathName === path;
  };

  return (
    <div className="flex justify-center">
      <div className="gap-16 mx-auto tabs">
        <Link
          href="/study"
          className={clsx(
            isCurrentPath("/study")
              ? "border-b-4 border-slate-800 font-medium"
              : "",
            "text-black tab tab-bordered tab-lg"
          )}
        >
          Courses
        </Link>
        <Link
          href="/study/mycourse"
          className={clsx(
            isCurrentPath("/study/mycourse")
              ? "border-b-4 border-slate-800 font-medium"
              : "",
            "text-black tab tab-bordered tab-lg"
          )}
        >
          My Courses
        </Link>
      </div>
    </div>
  );
};

export default CourseNavigate;

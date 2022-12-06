"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menus = [
  {
    href: "/",
    icon: "/assets/icons/icon-home.svg",
  },
  {
    href: "/study",
    icon: "/assets/icons/icon-book.svg",
  },
  {
    href: "#",
    icon: "/assets/icons/icon-live.svg",
  },
  {
    href: "#",
    icon: "/assets/icons/icon-airplane.svg",
  },
];

const Drawer = () => {
  const pathname = usePathname();
  return (
    <div className="w-[100px] lg:w-[163px] fixed inset-y-0 left-0 bg-[#FCFCFF] border-r border-solid border-[#27272B80]">
      <div className="pt-16 pb-14 border-b border-solid border-[#27272B80] flex justify-center">
        <Image priority quality={100} src="/logo.png" width={100} height={100} alt="logo" />
      </div>
      <div className="py-[72px] flex flex-col items-center space-y-12">
        {menus.map((item) => {
          const isActive = false;
          return (
            <Link
              className={clsx(
                "p-[18px] rounded-[10px]",
                isActive
                  ? "bg-[linear-gradient(89.24deg,#4488C7_0.51%,#36478A_99.21%)]"
                  : "bg-[#F4F5FF]"
              )}
              href={item.href}
              key={item.icon}
            >
              <Image src={item.icon} height={40} width={40} quality={100} alt="Icon" />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Drawer;

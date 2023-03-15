"use client";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./Container";
import Image from "next/image";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const menus = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Study",
    href: "/study",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

type Props = {
  className?: string;
};

const Navbar = ({ className }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="p-2.5 border-0.5 border-solid border-[#F4F5FF] rounded-[20px]">
      <Container
        className={clsx(
          "fixed inset-x-0 top-8 z-10 navbar bg-[#F4F5FF] h-[108px] rounded-[10px] flex items-center shadow-md",
          className
        )}
      >
        <div className="navbar-start space-x-4 flex-grow">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="p-2 mt-3 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              {menus.map((menu) => (
                <li key={menu.name}>
                  <Link href={menu.href}>{menu.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <a className="flex text-xl normal-case lg:hidden btn btn-ghost">
            Akather
          </a>
          <div className="hidden navbar-center lg:flex">
            <ul className="p-0 menu menu-horizontal">
              {menus.map((menu) => (
                <li key={menu.name}>
                  <Link className="font-semibold text-black" href={menu.href}>
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="navbar-end flex-grow-0 pr-4">
          {mounted && (
            <WalletMultiButtonDynamic
              className={clsx("!bg-indigo-600", "hover:!bg-indigo-900")}
            />
          )}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;

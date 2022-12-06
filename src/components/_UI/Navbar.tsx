"use client";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import Container from "./Container";

const SolanaConnectButton = dynamic(() => import("./SolanaConnectButton"), {
  ssr: false,
});

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
          "fixed inset-x-0 top-0 navbar bg-[#F4F5FF] h-[108px] rounded-[10px] !px-[16px]",
          className
        )}
      >
        <div className="navbar-start">
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
          <a className="flex text-xl normal-case lg:hidden btn btn-ghost">Akather</a>
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

        <div className="navbar-end">{mounted && <SolanaConnectButton />}</div>
      </Container>
    </div>
  );
};

export default Navbar;

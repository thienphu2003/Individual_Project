"use client";

import { useRouter } from "next/navigation";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import { useEffect, useRef, useState } from "react";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  useEffect(() => {
    console.log("render");
  });
  const handleLogout = () => {};
  return (
    <div
      className={twMerge(
        "h-fit bg-gradient-to-b from-emerald-800 p-6",
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35}></RxCaretLeft>
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35}></RxCaretRight>
          </button>
        </div>
        <div className="md:hidden flex gap-x-2 items-center">
          <button className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20}></HiHome>
          </button>
          <button className="rounded-full bg-white p-2 flex items-center justify-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20}></BiSearch>
          </button>
        </div>
        <div className="flex items-center gap-x-4 justify-between">
          <>
            <div>
              <Button
                onClick={() => {}}
                className="bg-transparent text-neutral-300 font-medium "
              >
                Sign Up
              </Button>
            </div>
            <div>
              <Button onClick={() => {}} className="bg-white px-6 py-2 ">
                Log In
              </Button>
            </div>
          </>
        </div>
      </div>
    </div>
  );
};

export default Header;

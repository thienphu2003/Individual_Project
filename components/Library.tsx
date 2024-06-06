"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

const Library = () => {
  const onClick = () => {
    console.log("click");
  };
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="gap-x-2 inline-flex items-center">
          <TbPlaylist size={26} className="text-neutral-400" />
          <p className="text-neutral-400 text-md font-medium">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        ></AiOutlinePlus>
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">List of songs!</div>
    </div>
  );
};

export default Library;

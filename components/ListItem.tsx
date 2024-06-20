"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}
const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();
  const onClick = () => {
    //Add authentication before push
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      className=" relative group flex items-center rounded-md overflow-hidden bg-neutral-100/10 gap-x-4 hover:bg-neutral-100/20 transition pr-4"
    >
      <div className="relative min-h-[80px] min-w-[80px]">
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p className="font-medium py-5 truncate">{name}</p>
      <div className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 group-hover:opacity-100 hover:scale-110 drop-shadow-md right-5">
        <FaPlay className="text-black"></FaPlay>
      </div>
    </button>
  );
};

export default ListItem;

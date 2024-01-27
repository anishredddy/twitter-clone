"use client";

import { useParams, useRouter } from "next/navigation";
import { FaFeather } from "react-icons/fa";

const SideBarTweetButton = () => {
  const router = useRouter();
  const params = useParams();
  return (
    <div onClick={() => router.push(`/${params.userId}`)}>
      <div
        className="mt-6 lg:hidden rounded-full h-14 w-14 flex items-center
            justify-center bg-sky-500 hover:bg-opacity-80 transition cursor-pointer"
      >
        <FaFeather size={24} color="white" />
      </div>
      <div
        className="hidden mt-6 lg:block px-4 py-2 rounded-full bg-sky-500 hover:bg-opacity-90
            transition cursor-pointer"
      >
        <p className="hidden lg:block text-center font-semibold text-white text-[20px]">
          Tweet
        </p>
      </div>
    </div>
  );
};

export default SideBarTweetButton;

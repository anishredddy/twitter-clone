"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { ArrowBigLeft } from "lucide-react";

interface HeaderProps {
  label: String;
  showBackArrow?: boolean;
}
const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <div className="border-b-[1px] border-neutral-800 p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <ArrowBigLeft
            onClick={onClick}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-white text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;

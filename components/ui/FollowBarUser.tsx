"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

interface FollowBarUserProps {
  id: string;
  name: string | null;
  email: string | null;
  profileImage: string;
}

const FollowBarUser: React.FC<FollowBarUserProps> = ({
  id,
  name,
  email,
  profileImage,
}) => {
  const router = useRouter();
  const params = useParams();

  const onClick = () => {
    router.push(`/${params.userId}/users/${id}`);
  };
  return (
    <div className="flex flex-row gap-6 mt-4 cursor-pointer" onClick={onClick}>
      {/* To be done filled from server */}
      <div className="mt-1.5 rounded-full w-10 h-10 hover:opacity-90 transition relative">
        <Image
          fill
          style={{
            objectFit: "cover",
            borderRadius: "100%",
          }}
          alt="Avatar"
          src={profileImage || "/images/placeholder.png"}
        />
      </div>
      <div className="flex flex-col">
        <div className="px-2  text-white text-xl font-semibold">{name}</div>
        <div className=" text-neutral-500 text-sm">{email}</div>
      </div>
    </div>
  );
};

export default FollowBarUser;

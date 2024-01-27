"use client";

import { format } from "date-fns/format";
import { useParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { BiCalendar } from "react-icons/bi";

interface UserBioProps {
  bio: string | null;
  createdAt: Date;
  name: string;
  username: string;
  followerCount: number;
  followersCount: number;
}
const UserBio: React.FC<UserBioProps> = ({
  bio,
  createdAt,
  name,
  username,
  followerCount,
  followersCount,
}) => {
  const params = useParams();

  const created = format(new Date(createdAt), "MMMM yyyy");
  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {params.userId === params.id ? (
          <Button secondary label="Edit" onClick={() => {}} />
        ) : (
          <Button onClick={() => {}} label="Follow" secondary />
        )}
      </div>
      <div className="mt-8 px-4 ">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">{name}</p>
          <p className="text-md text-neutral-500">@{username}</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-white">{bio}</p>
          <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
            <BiCalendar size={24} />
            <p>Joined {created}</p>
          </div>
        </div>
        <div className="flex flex-row items-center mt-4 gap-6">
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{followerCount}</p>
            <p className="text-neutral-500">Following</p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <p className="text-white">{followersCount}</p>
            <p className="text-neutral-500">Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBio;

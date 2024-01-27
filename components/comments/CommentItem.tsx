"use client";

import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";

interface CommentItemProps {
  data: Record<string, any>;
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  const goToUser = (event: any) => {
    event.stopPropagation();

    router.push(`/${params.userId}/users/${data.user.id}`);
  };

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, []);

  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition ">
      <div className="flex flex-row items-start gap-3">
        <div
          className={` h-12 w-12 rounded-full hover:opacity-90 transition cursor-pointer relative`}
        >
          <Image
            fill
            style={{
              objectFit: "cover",
              borderRadius: "100%",
            }}
            alt="Avatar"
            onClick={goToUser}
            src={data.user.profileImage || "/images/placeholder.png"}
          />
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block">
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;

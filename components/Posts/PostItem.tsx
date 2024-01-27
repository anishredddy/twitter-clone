"use client";

import axios from "axios";
import { formatDistanceToNowStrict } from "date-fns";
import { HeartIcon, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import toast from "react-hot-toast";

interface PostItemProps {
  data: Record<string, any>;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  const params = useParams();

  const userLiked: boolean = data.likedIds
    ? data.likedIds.includes(params.userId)
    : false;

  const goToUser = (event: any) => {
    event.stopPropagation();
    router.push(`/${params.userId}/users/${data.user.id}`);
  };

  const goToPost = () => {
    router.push(`/${params.userId}/posts/${data.id}`);
  };

  const onLike = async (event: any) => {
    event.stopPropagation();

    try {
      if (!userLiked) {
        const payload = { postId: data.id };

        await axios.post(`/api/${params.userId}/likepost`, payload);

        toast.success("Post Liked");
      } else {
        const payload = { postId: data.id };

        await axios.post(`/api/${params.userId}/removelikepost`, payload);

        toast.success("Post Un Liked");
      }

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  return (
    <div
      onClick={goToPost}
      className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition "
    >
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
              className="text-white font-semibold cursor-pointer hover:underline"
              onClick={goToUser}
            >
              {data.user.name}
            </p>
            <span
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
              onClick={goToUser}
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-sky-500">
              <MessageCircleMore size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer transition hover:text-red-500"
            >
              <HeartIcon size={20} fill={userLiked ? "red" : ""} />
              <p>{data.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;

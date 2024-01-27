"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import Button from "../ui/Button";

interface FormProps {
  placeholder: string;
  isComment?: boolean;
  postId?: string;
  userId: string;
  profileImage: string;
}

const Form: React.FC<FormProps> = ({
  placeholder,
  isComment,
  postId,
  userId,
  profileImage,
}) => {
  const params = useParams();
  const router = useRouter();

  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await axios.post(`/api/${params.userId}/posts`, { body });

      toast.success("Succcesfully created Tweet");

      setBody("");

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const onClickAvatar = () => {
    router.push(`/${userId}/users/${userId}`);
  };

  return (
    <div className="border-b-[1px] border-neutral-800 px-5 py-2">
      {/* <div className="py-8">
            <h1 className="text-white text-2xl text-center mb-4 font-bold">Welcome to Twitter !!</h1>
            <div className="flex flex-row items-center justify-center gap-4">
                <Button
            </div>
        </div> */}
      <div className="flex flex-row gap-4">
        <div>
          {/* <h1 className="text-white font-3xl">{placeholder}</h1> */}
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
              onClick={onClickAvatar}
              src={profileImage || "/images/placeholder.png"}
            />
          </div>
        </div>
        <div className="w-full">
          <textarea
            disabled={isLoading}
            onChange={(e) => setBody(e.target.value)}
            value={body}
            placeholder={placeholder}
            className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0
                    outline-none text-[20px] placeholder-neutral-500 text-white"
          ></textarea>
          <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
          <div className="mt-4 flex flex-row justify-end">
            <Button
              disabled={isLoading || !body}
              onClick={onSubmit}
              label="Tweet"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;

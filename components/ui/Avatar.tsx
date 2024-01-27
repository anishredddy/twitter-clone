import Image from "next/image";
import { useRouter } from "next/router";

interface AvatarProps {
  userId: string;
  isLarge?: boolean;
  hasBorder?: boolean;
  profileImage?: string;
}

const Avatar: React.FC<AvatarProps> = async ({
  userId,
  isLarge,
  hasBorder,
  profileImage,
}) => {
  const router = useRouter();

  const onClick = (event: any) => {
    event.stopPropagation();

    const url = `/${userId}/users`;

    router.push(url);
  };

  return (
    <div
      className={`
        ${hasBorder ? "border-4 border-black" : ""}
        ${isLarge ? "h-32" : "h-12"}
        ${isLarge ? "w-32" : "w-12"}
        rounded-full 
        hover:opacity-90 
        transition 
        cursor-pointer
        relative
      `}
    >
      <Image
        fill
        style={{
          objectFit: "cover",
          borderRadius: "100%",
        }}
        alt="Avatar"
        onClick={onClick}
        src={profileImage || "/images/placeholder.png"}
      />
    </div>
  );
};

export default Avatar;

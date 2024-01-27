import prismadb from "@/libs/prismadb";
import Image from "next/image";

interface UserHeroProps {
  userId: string;
}

const UserHero: React.FC<UserHeroProps> = async ({ userId }) => {
  const fetchedUser = await prismadb.user.findUnique({
    where: {
      id: userId,
    },
  });

  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {fetchedUser?.coverImage && (
          <Image
            src={fetchedUser.coverImage}
            fill
            alt="Cover Image"
            style={{ objectFit: "cover" }}
          />
        )}
        <div className="absolute -bottom-16 left-4">
          <div
            className={`
        border-4 border-black
        h-32
        w-32
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
              src={fetchedUser?.profileImage || "/images/placeholder.png"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHero;

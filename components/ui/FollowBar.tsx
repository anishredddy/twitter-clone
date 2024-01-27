import prismadb from "@/libs/prismadb";
import FollowBarUser from "./FollowBarUser";

const FollowBar = async () => {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  if (users.length === 0) {
    return null;
  }

  return (
    <div className="px-6 py-4 hidden lg:block">
      <div className="bg-neutral-800 rounded-xl p-4">
        <h2 className="text-white text-xl font-semibold">Who to follow</h2>
        {users.map((user) => (
          <FollowBarUser
            name={user.name}
            id={user.id}
            email={user.email}
            key={user.id}
            profileImage={user.profileImage ? user.profileImage : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default FollowBar;

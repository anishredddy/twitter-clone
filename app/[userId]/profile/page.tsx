import Header from "@/components/ui/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import prismadb from "@/libs/prismadb";

const ProfilePage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  //   const [isLoading, setIsLoading] = useState(false);

  const fetchedUser = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
  });
  const followersCount = await prismadb.user.count({
    where: {
      followingIds: {
        has: params.userId,
      },
    },
  });

  if (!fetchedUser) {
    return (
      <div className="flex justify-center items-center">
        <Header label="User Not Found" />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={fetchedUser.name} />
      <UserHero userId={fetchedUser.id} />
      <UserBio
        bio={fetchedUser.bio}
        createdAt={fetchedUser.createdAt}
        name={fetchedUser.name}
        username={fetchedUser.username}
        followerCount={fetchedUser.followingIds.length}
        followersCount={followersCount || 0}
      />
    </>
  );
};

export default ProfilePage;

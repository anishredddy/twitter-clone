import PostFeed from "@/components/Posts/PostFeed";
import Header from "@/components/ui/Header";
import UserBio from "@/components/users/UserBio";
import UserHero from "@/components/users/UserHero";
import prismadb from "@/libs/prismadb";

const UserViewPage = async ({
  params,
}: {
  params: {
    userId: string;
    id: string;
  };
}) => {
  //   const [isLoading, setIsLoading] = useState(false);

  const fetchedUser = await prismadb.user.findUnique({
    where: {
      id: params.id,
    },
  });
  const followersCount = await prismadb.user.count({
    where: {
      followingIds: {
        has: params.id,
      },
    },
  });

  const currentUser = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  //   setIsLoading(true);

  //   if (isLoading || !fetchedUser) {
  //     return (
  //       <div className="flex justify-center items-center h-full">
  //         <ClipLoader color="lightblue" size={80} />
  //       </div>
  //     );
  //   }

  if (!fetchedUser) {
    return (
      <div className="flex justify-center items-center">
        <Header label="User Not Found" />
      </div>
    );
  }

  const isFollowing: boolean = currentUser
    ? currentUser.followingIds.includes(params.id)
    : false;

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
        isFollowing={isFollowing}
      />
      <PostFeed userId={fetchedUser.id} />
    </>
  );
};

export default UserViewPage;

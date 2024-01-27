import Form from "@/components/Posts/Form";
import PostFeed from "@/components/Posts/PostFeed";
import Header from "@/components/ui/Header";
import prismadb from "@/libs/prismadb";

const page = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const fetchedUser = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  return (
    <div>
      <Header label="Home" />
      <Form
        placeholder="What's Happening??"
        userId={params.userId}
        profileImage={fetchedUser?.profileImage || ""}
      />
      <PostFeed />
    </div>
  );
};

export default page;

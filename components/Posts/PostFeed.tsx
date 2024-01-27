import prismadb from "@/libs/prismadb";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = async ({ userId }) => {
  const posts = await prismadb.post.findMany({
    where: {
      userId,
    },
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;

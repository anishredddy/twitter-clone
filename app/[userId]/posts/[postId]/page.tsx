import PostItem from "@/components/Posts/PostItem";
import CommentFeed from "@/components/comments/CommentFeed";
import CommentForm from "@/components/comments/CommentForm";
import Header from "@/components/ui/Header";
import prismadb from "@/libs/prismadb";

const PostPage = async ({
  params,
}: {
  params: {
    userId: string;
    postId: string;
  };
}) => {
  const post = await prismadb.post.findUnique({
    where: {
      id: params.postId,
    },
    include: {
      user: true,
      comments: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const currentUser = await prismadb.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!post || !currentUser) {
    return (
      <div className="flex items-center justify-center">
        <Header label="Post Not Found" />
      </div>
    );
  }
  return (
    <div>
      <Header label="Tweet" showBackArrow />
      <PostItem data={post} />
      <CommentForm
        postId={post.id}
        isComment
        placeholder="Tweet your reply"
        userId={params.userId}
        profileImage={currentUser.profileImage || ""}
      />
      <CommentFeed comments={post?.comments} />
    </div>
  );
};

export default PostPage;

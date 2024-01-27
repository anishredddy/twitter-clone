import prismadb from "@/libs/prismadb";
import { useParams } from "next/navigation";
import EditModal from "./EditModal";

interface EditProviderProps {
  id: string;
}

const EditProvider: React.FC<EditProviderProps> = async ({ id }) => {
  const user = await prismadb.user.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) {
    return null;
  }

  const currentUser = {
    id: user.id,
    profileImage: user.profileImage || "",
    coverImage: user.coverImage || "",
    name: user.name,
    username: user.username,
    bio: user.bio || "",
  };

  return <EditModal currentUser={currentUser} />;
};

export default EditProvider;

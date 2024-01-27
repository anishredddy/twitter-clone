"use client";

import useEditModal from "@/hooks/use-edit-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../ui/Modal";
import Input from "../ui/Input";
import ImageUpload from "../users/ImageUpload";

interface EditModalProps {
  currentUser: {
    id: string;
    profileImage: string;
    coverImage: string;
    name: string;
    username: string;
    bio: string;
  };
}

const EditModal: React.FC<EditModalProps> = ({ currentUser }) => {
  const editModal = useEditModal();
  const router = useRouter();

  const [profileImage, setProfileImage] = useState(" ");
  const [coverImage, setCoverImage] = useState(" ");
  const [name, setName] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [bio, setBio] = useState(" ");

  useEffect(() => {
    setProfileImage(currentUser.profileImage);
    setCoverImage(currentUser.coverImage);
    setName(currentUser.name);
    setUsername(currentUser.username);
    setBio(currentUser.bio);
  }, [
    currentUser.name,
    currentUser.profileImage,
    currentUser.coverImage,
    currentUser.username,
    currentUser.bio,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const data = { name, username, bio, coverImage, profileImage };
      const response = await axios.patch(`/api/${currentUser.id}`, data);

      toast.success("Updated Successfully");
      router.refresh();
      editModal.onClose();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        value={profileImage}
        disabled={isLoading}
        onChange={(image) => setProfileImage(image)}
        label="Upload Profile Image"
      />
      <ImageUpload
        value={coverImage}
        disabled={isLoading}
        onChange={(image) => setCoverImage(image)}
        label="Upload Cover Image"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
        id="name"
      />
      <Input
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        id="username"
      />
      <Input
        placeholder="Bio"
        onChange={(e) => setBio(e.target.value)}
        value={bio}
        disabled={isLoading}
        id="bio"
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={editModal.isOpen}
      title="Edit Your Profile"
      actionLabel="Save"
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
    />
  );
};

export default EditModal;

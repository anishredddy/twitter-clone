"use client";

import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import useRegisterModal from "@/hooks/use-register-modal";
import useLoginModal from "@/hooks/use-login-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      //login adn register
      const data = {
        name,
        username,
        email,
        password,
      };
      const response = await axios.post("/api", data);

      router.push(`/${response.data.id}`);

      toast.success("Succesfully logged in");

      registerModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onToggle = () => {
    if (isLoading) {
      return;
    }
    registerModal.onClose();
    loginModal.onOpen();
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
        id="email"
      />
      <Input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
        disabled={isLoading}
        id="name"
      />
      <Input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        disabled={isLoading}
        id="username"
      />
      <Input
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
        id="password"
        type="password"
      />
    </div>
  );

  const footerContent = (
    <div className="text-neutral-400 text-center mt-4">
      Already have an Account?
      <span
        onClick={onToggle}
        className="text-white cursor-pointer hover:underline"
      >
        Login
      </span>
    </div>
  );

  return (
    <form>
      <Modal
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Create an Account"
        actionLabel="Register"
        onClose={registerModal.onClose}
        onSubmit={onSubmit}
        body={bodyContent}
        footer={footerContent}
      />
    </form>
  );
};

export default RegisterModal;

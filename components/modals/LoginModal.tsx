"use client";

import useLoginModal from "@/hooks/use-login-modal";
import { useEffect, useState } from "react";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import useRegisterModal from "@/hooks/use-register-modal";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginModal = () => {
  const router = useRouter();

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onToggle = () => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      //login

      const data = {
        email,
        password,
      };

      const response = await axios.post("/api/GetUser", data);

      router.push(`/${response.data.id}`);

      toast.success("Successfully Logged In");

      loginModal.onClose();
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials");
      console.log("invalid credentials");
    } finally {
      setIsLoading(false);
    }
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
      First time using Twitter?
      <span
        onClick={onToggle}
        className="text-white cursor-pointer hover:underline"
      >
        Create an Account
      </span>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Sign in"
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

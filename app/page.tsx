"use client";

import SideBar from "@/components/sidebar/SideBar";
import Button from "@/components/ui/Button";
import useLoginModal from "@/hooks/use-login-modal";
import useRegisterModal from "@/hooks/use-register-modal";

export default function Home() {
  const loginModal = useLoginModal();

  const registerModal = useRegisterModal();

  const onLoginClick = () => {
    loginModal.onOpen();
  };

  const onRegisterClick = () => {
    registerModal.onOpen();
  };
  return (
    <>
      <div className="h-screen bg-black">
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
          <div className="grid grid-cols-4 h-full ">
            <SideBar no={0} />
            <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
              <div className="flex flex-col justify-center h-full">
                <h1 className="md:mr-auto lg:text-center w-full  text-white md:text-4xl  lg:text-6xl sm:text-4xl font-extrabold">
                  Welcome To <br /> Twitter !!!
                </h1>

                <div className="flex flex-column justify-center items-center p-5 gap-8">
                  <Button label="Login" onClick={onLoginClick} large />
                  <Button label="Register" onClick={onRegisterClick} large />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

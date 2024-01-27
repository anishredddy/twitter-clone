// "use client";

import EditModal from "@/components/modals/EditModal";
import EditProvider from "@/components/modals/EditProvider";
// import { useEffect, useState } from "react";

interface EditModalProviderProps {
  id: string;
}

export const EditModalProvider: React.FC<EditModalProviderProps> = ({ id }) => {
  //   const [isMounted, setIsMounted] = useState(false);

  //   useEffect(() => {
  //     setIsMounted(true);
  //   }, []);

  //   if (!isMounted) {
  //     return null;
  //   }

  return (
    <>
      <EditProvider id={id} />
    </>
  );
};

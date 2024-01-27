import SideBar from "@/components/sidebar/SideBar";
import prismadb from "@/libs/prismadb";
import { useEffect, useState } from "react";

interface SideBarProviderProps {
  userId: string;
}

export const SideBarProvider: React.FC<SideBarProviderProps> = async ({
  userId,
}) => {
  const no = await prismadb.notification.count({
    where: {
      userId,
    },
  });

  return (
    <>
      <SideBar no={no} />
    </>
  );
};

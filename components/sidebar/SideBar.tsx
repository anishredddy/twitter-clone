"use client";

import React from "react";
import { Home, Bell, User, LogOut, BellRing } from "lucide-react";
import SideBarLogo from "./SideBarLogo";
import SideBarItem from "./SideBarItem";
import SideBarTweetButton from "./SideBarTweetButton";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface SideBarProps {
  no: number;
}

const SideBar: React.FC<SideBarProps> = ({ no }) => {
  const router = useRouter();
  const params = useParams();
  const items = [
    {
      label: "Home",
      href: `/${params.userId}`,
      icon: Home,
    },
    {
      label: `Notifications (${no})`,
      href: `/${params.userId}/notifications`,
      icon: no ? BellRing : Bell,
    },
    {
      label: "profile",
      href: `/${params.userId}/users/${params.userId}`,
      icon: User,
    },
  ];

  const logout = () => {
    router.push("/");
  };
  return (
    <div className="col-span-1 h-full pr-4 md:pr-6">
      <div className="flex flex-col items-end">
        <div className="space-y-2 lg:w-[230px]">
          <SideBarLogo />
          {items.map((item) => (
            <Link key={item.href} href={item.href}>
              <SideBarItem
                href={item.href}
                label={item.label}
                icon={item.icon}
              />
            </Link>
          ))}
          <SideBarItem icon={LogOut} onClick={logout} label="Log Out" />
          <SideBarTweetButton />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

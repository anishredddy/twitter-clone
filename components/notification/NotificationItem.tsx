import prismadb from "@/libs/prismadb";
import SideBarLogo from "../sidebar/SideBarLogo";

interface NotificationItemProps {
  data: Record<string, any>;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ data }) => {
  return (
    <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition ">
      <div className="flex flex-row items-center">
        <SideBarLogo />
        <p className="text-white font-xl">{data.body}</p>
      </div>
    </div>
  );
};

export default NotificationItem;

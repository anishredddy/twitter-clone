import SideBar from "@/components/sidebar/SideBar";
import FollowBar from "@/components/ui/FollowBar";
import { EditModalProvider } from "@/providers/edit-modal-provider";
import { SideBarProvider } from "@/providers/side-bar-provider";

export default function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    userId: string;
  };
}) {
  return (
    <>
      <EditModalProvider id={params.userId} />
      <div className="h-screen bg-black">
        <div className="container h-full mx-auto xl:px-30 max-w-6xl">
          <div className="grid grid-cols-4 h-full ">
            <SideBarProvider userId={params.userId} />
            <div className="col-span-3 lg:col-span-2 border-x-[1px] border-neutral-800">
              {children}
            </div>
            <FollowBar />
          </div>
        </div>
      </div>
    </>
  );
}

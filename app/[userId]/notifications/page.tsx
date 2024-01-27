import NotificationItem from "@/components/notification/NotificationItem";
import SideBarLogo from "@/components/sidebar/SideBarLogo";
import Header from "@/components/ui/Header";
import prismadb from "@/libs/prismadb";

const NotificationPage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const notifications = await prismadb.notification.findMany({
    where: {
      userId: params.userId,
    },
  });

  if (!notifications || notifications.length === 0) {
    return (
      <div className="flex items-center justify-center">
        <Header label="No Notifications" showBackArrow />
      </div>
    );
  }

  await prismadb.notification.deleteMany({
    where: {
      userId: params.userId,
    },
  });

  return (
    <div>
      <Header label="Notifications" showBackArrow />
      {notifications.map((notification) => (
        <NotificationItem key={notification.id} data={notification} />
      ))}
    </div>
  );
};

export default NotificationPage;

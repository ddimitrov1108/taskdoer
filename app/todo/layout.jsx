import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { getLabels, getProjects } from "@/db";
import {
  HeaderBarNavigation,
  SideBarNavigation,
} from "@/components/navigation";
import { TaskProvider } from "@/components/providers";

const AppLayout = async ({ children }) => {
  const [session, projects, labels] = await Promise.all([
    getServerSession(nextAuthConfig),
    getProjects(),
    getLabels(),
  ]);

  return (
    <>
      <div className="w-full flex">
        <HeaderBarNavigation user={session.user} data={{ projects, labels }} />
        <SideBarNavigation user={session.user} data={{ projects, labels }} />

        <div className="bg-black-dark h-full w-full mt-16 lg:mt-0 lg:ml-96 py-8 px-4 xxs:px-6 lg:px-8 xl:p-12">
          <TaskProvider>{children}</TaskProvider>
        </div>
      </div>
    </>
  );
};

export default AppLayout;

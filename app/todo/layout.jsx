import { getServerSession } from "next-auth";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { getLabels, getProjects } from "@/db/user";
import {
  HeaderBarNavigation,
  SideBarNavigation,
} from "@/components/navigation";

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

        <div className="bg-black-dark overflow-auto styled-overflow w-full mt-16 lg:mt-0 lg:ml-96 py-8 px-4 xs:px-6 lg:px-8 xl:p-12">
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};

export default AppLayout;

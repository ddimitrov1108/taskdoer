import Image from "next/image";
import { Logo } from "@/components/ui";
import { nextAuthConfig } from "@/lib/next-auth-config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }) => {
  const session = await getServerSession(nextAuthConfig);
  if (session) return redirect("/todo");

  return (
    <div className="relative grid items-center grid-cols-7">
      <div className="bg-black-main px-6 py-10 w-full min-h-screen max-w-[520px] mx-auto lg:mx-0 lg:max-w-none col-span-full lg:col-span-3 xl:col-span-2 xl:px-12">
        <Logo className="max-w-fit" />

        <div className="relative flex flex-col min-h-[80vh] justify-center h- py-14">
          {children}
        </div>
      </div>

      <div className="-z-10 fixed top-0 left-0 right-0 bottom-0 hidden lg:block">
        <div className="max-h-screen">
          <Image
            src="/auth-bg.svg"
            alt="banner"
            width={1920}
            height={1080}
            className="min-h-screen object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

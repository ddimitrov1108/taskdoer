import Link from "next/link";
import Image from "next/image";
import { Button, Logo } from "@/components/ui";

export default function Home() {
  return (
    <div className="h-screen pb-14 bg-black-dark">
      <div className="w-full container mx-auto p-6">
        <div className="w-full flex items-center justify-between">
          <Logo className="lg:text-xl" />
        </div>
      </div>

      <div className="container pt-24 md:pt-48 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
        <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
          <h1 className="my-4 text-3xl md:text-5xl text-primary-main font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
            TaskDoer - Your schedule app
          </h1>
          <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
            Application that will help you to manage your day to day and future
            activities.
          </p>

          <p className="text-blue-400 font-bold pb-8 lg:pb-6 text-center md:text-left fade-in">
            Continue to our app!
          </p>
          <div className="flex gap-4 w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">
            <Link href="/sign-in">
              <Button variant="primary" size="lg">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up">
              <Button variant="text" size="lg">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full xl:w-3/5 py-6 overflow-y-hidden border-8 border-black-main rounded-lg">
          <Image
            src="/taskdoer-app.png"
            width={1920}
            height={1080}
            alt="taskdoer-app.png"
            className="w-6/7 mx-auto lg:mr-0 slide-in-bottom rounded-lg overflow-hidden"
          />
        </div>

        <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
          <Link href="#" className="text-main no-underline hover:no-underline">
            &copy; TaskDoer 2023
          </Link>
        </div>
      </div>
    </div>
  );
}

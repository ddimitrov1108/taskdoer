import { Logo, Skeleton } from "../ui";

const HeaderBarNavigationSkeleton = () => {
  return (
    <>
      <Logo />
      <Skeleton className="w-8 h-8 rounded-full" />
    </>
  );
};

export default HeaderBarNavigationSkeleton;

import { Skeleton } from "../ui";

const SideBarNavigationSkeleton = () => {
  return (
    <>
      <div className="grid gap-3 p-2">
        <Skeleton className="w-full h-3 rounded-lg" />
        {Array.from(Array(4).keys()).map((index) => (
          <div key={index} className="flex items-center gap-3 px-2 py-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-2 rounded-lg w-1/3" />
          </div>
        ))}
      </div>

      <div className="grid gap-3 p-2">
        <Skeleton className="w-full h-3 rounded-lg" />
        {Array.from(Array(4).keys()).map((index) => (
          <div key={index} className="flex items-center gap-3 px-2 py-2">
            <Skeleton className="w-3 h-3 rounded-full" />
            <Skeleton className="h-2 rounded-lg w-1/3" />
          </div>
        ))}
      </div>
    </>
  );
};

export default SideBarNavigationSkeleton;

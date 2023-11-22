import { Skeleton } from "../ui";

const ListSkeleton = () => {
  return Array.from(Array(4).keys()).map((index) => (
    <div key={index} className="flex items-center gap-3 px-2 py-2">
      <Skeleton className="w-3 h-3 rounded-full" />
      <Skeleton className="h-2 rounded-lg w-1/4" />
    </div>
  ));
};
export default ListSkeleton;

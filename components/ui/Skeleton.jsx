import clsx from "clsx";

const Skeleton = ({ className, ...restProps }) => {
  return (
    <div
      className={clsx(`animate-pulse bg-gray-100`, className)}
      {...restProps}
    ></div>
  );
};
export default Skeleton;

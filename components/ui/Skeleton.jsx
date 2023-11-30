import clsx from "clsx";

const Skeleton = ({ className, ...restProps }) => {
  return (
    <div
      className={clsx(`animate-pulse bg-black-main`, className)}
      {...restProps}
    ></div>
  );
};
export default Skeleton;

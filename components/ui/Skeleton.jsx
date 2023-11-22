import clsx from "clsx";

const Skeleton = ({ className, ...restProps }) => {
  return (
    <div
      className={clsx(`animate-pulse bg-slate-100`, className)}
      {...restProps}
    ></div>
  );
};
export default Skeleton;

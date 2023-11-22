import Link from "next/link";
import { HiOutlineBellAlert } from "react-icons/hi2";
import clsx from "clsx";

const Logo = ({ className, ...restProps }) => {
  return (
    <Link
      href="/"
      className={clsx(
        "group flex items-center gap-2 text-xl font-semibold text-primary-main",
        className
      )}
      {...restProps}
    >
      <HiOutlineBellAlert className="text-3xl text-inherit group-hover:animate-[wiggle_1s_ease-in-out_infinite] transition-all" />
      TaskDoer
    </Link>
  );
};
export default Logo;

"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const NavLink = ({
  href = "/",
  name,
  appendIcon = <></>,
  count = 0,
  className,
  ...restProps
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(
        "w-full p-2 rounded-lg flex items-center justify-between gap-3",
        className,
        pathname.includes(href) && "bg-slate-50"
      )}
      {...restProps}
    >
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3">
          <div>{appendIcon}</div>
          <span className="max-w-[200px] overflow-hidden truncate ...">{name}</span>
        </div>
      </div>

      {count > 0 && (
        <span className="pr-2 min-w-fit min-h-fit text-primary-main">
          {count}
        </span>
      )}
    </Link>
  );
};

export default NavLink;

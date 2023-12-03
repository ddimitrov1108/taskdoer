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
        "transition-all w-full p-2 rounded-lg flex items-center justify-between gap-3",
        className,
        pathname === href
          ? "bg-black-light/10 text-white"
          : "text-light hover:text-white hover:bg-black-light/10"
      )}
      {...restProps}
    >
      <div className="flex items-center gap-3">
        {appendIcon}
        <span className="max-w-[200px] overflow-hidden truncate ...">
          {name}
        </span>
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

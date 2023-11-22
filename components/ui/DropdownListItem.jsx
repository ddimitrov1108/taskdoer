"use client";
import { Menu } from "@headlessui/react";
import clsx from "clsx";
import Link from "next/link";

const DropdownListItem = ({
  as = "button",
  item,
  className,
  iconClassName,
  onClick = () => {},
}) => {
  const defaultClassNames =
    "w-full p-2 hover:bg-slate-50 rounded-lg flex items-center gap-3";

  const itemBody = (
    <>
      <div className={clsx("text-xl", iconClassName)}>{item.icon}</div>
      <span>{item.name}</span>
    </>
  );

  return (
    <Menu.Item>
      {as === "button" ? (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={clsx(defaultClassNames, className)}
        >
          {itemBody}
        </button>
      ) : (
        <Link href={item.href} className={clsx(defaultClassNames, className)}>
          {itemBody}
        </Link>
      )}
    </Menu.Item>
  );
};

export default DropdownListItem;
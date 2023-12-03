"use client";
import { Menu } from "@headlessui/react";
import clsx from "clsx";

const DropdownListItem = ({
  as = "button",
  item,
  className,
  iconClassName,
  ...restProps
}) => {
  return (
    <Menu.Item
      as={as}
      className={clsx(
        "transition-all w-full p-2 rounded-lg flex items-center gap-2 hover:bg-black-light/10",
        className
      )}
      {...restProps}
    >
      <div className={clsx("text-xl", iconClassName)}>{item.icon}</div>
      {item.name}
    </Menu.Item>
  );
};

export default DropdownListItem;

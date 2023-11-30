"use client";
import { Menu } from "@headlessui/react";
import clsx from "clsx";

const DropdownList = ({ className, children }) => {
  return (
    <Menu.Items
      className={clsx(
        "overflow-hidden z-40 absolute right-0 mt-2 w-56 origin-top-right border border-gray-200 rounded-lg bg-white shadow-xl focus:outline-none outline-none select-none",
        className
      )}
    >
      {children}
    </Menu.Items>
  );
};

export default DropdownList;

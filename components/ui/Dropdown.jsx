"use client";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";
import DropdownList from "./DropdownList";

const Dropdown = ({
  btn = "Dropdown",
  className,
  btnClassName,
  menuItemsClassName,
  chevronClassName,
  chevronDown = false,
  children,
  ...restProps
}) => {
  return (
    <Menu as="div" className={clsx("", className)} {...restProps}>
      <Menu.Button
        className={btnClassName}
        onClick={(e) => e.stopPropagation()}
      >
        {({ open }) => (
          <>
            {btn}
            {chevronDown && (
              <div
                className={clsx(
                  "text-xl text-main transition-all",
                  open && "rotate-180",
                  chevronClassName
                )}
              >
                <HiChevronDown />
              </div>
            )}
          </>
        )}
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="relative">
          <Menu.Items
            className={clsx(
              "overflow-hidden z-40 absolute right-0 mt-2 w-56 origin-top-right rounded-lg shadow-xl focus:outline-none outline-none select-none",
              menuItemsClassName
            )}
          >
            {children}
          </Menu.Items>
        </div>
      </Transition>
    </Menu>
  );
};

export default Dropdown;

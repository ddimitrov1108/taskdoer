"use client";
import { Disclosure } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";

const DisclouseContainer = ({
  title = "",
  appendToTitle,
  boxHoverEffect = false,
  hideChevron = false,
  className,
  btnClassName,
  panelClassName,
  onChildrenElementClick,
  children,
  open = false,
  ...restProps
}) => {
  return (
    <div className={clsx("select-none", className)}>
      <Disclosure {...restProps} defaultOpen={open}>
        {({ open }) => (
          <>
            <Disclosure.Button
              as="div"
              className={clsx(
                "text-main cursor-pointer group flex items-center font-medium transition-all",
                boxHoverEffect
                  ? "hover:text-white"
                  : "hover:text-primary-main",
                btnClassName
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "z-0 transition-all text-main text-xl",
                    open && "rotate-180"
                  )}
                >
                  {!hideChevron && <HiChevronDown />}
                </div>

                {title}
              </div>

              {appendToTitle}
            </Disclosure.Button>

            <Disclosure.Panel
              className={clsx(
                "grid text-black transition-all",
                panelClassName
              )}
            >
              {children}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};
export default DisclouseContainer;

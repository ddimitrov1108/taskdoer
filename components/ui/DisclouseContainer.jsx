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
                "cursor-pointer group flex items-center font-semibold transition-all",
                boxHoverEffect
                  ? "hover:bg-slate-50"
                  : "hover:text-primary-main",
                btnClassName
              )}
            >
              <div className="flex items-center gap-3">
                <div
                  className={clsx(
                    "transition-all text-slate-400 text-xl",
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

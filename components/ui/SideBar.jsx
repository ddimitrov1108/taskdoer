"use client";
import { HiXMark } from "react-icons/hi2";
import { Logo, IconButton } from ".";
import clsx from "clsx";

const SideBar = ({
  title,
  open,
  onClose,
  showFrom = "left",
  showLogo = true,
  children,
  containerClassName,
  className,
  headerClassName,
  bodyClassName,
  ...restProps
}) => {
  return (
    <div
      className={clsx("w-full h-full", containerClassName)}
      {...restProps}
    >
      <div
        onClick={onClose}
        className={clsx(
          "z-40 transition-all fixed top-0 right-0 left-0 bottom-0 bg-black-dark/30 backdrop-blur-sm",
          open ? "block" : "hidden"
        )}
      ></div>
      <div
        className={clsx(
          "z-40 fixed top-0 w-full sm:w-1/2 h-full transition-all ease-in-out duration-300",
          showFrom === "right" && "right-0",
          showFrom === "right"
            ? open
              ? "translate-x-0 "
              : "translate-x-full"
            : "right-0",
          showFrom === "left" ? (open ? "left-0" : "-left-full") : "",
          className
        )}
      >
        <div className="h-full overflow-auto styled-overflow">
          <div className="relative grid">
            <div
              className={clsx(
                "flex items-center w-full",
                showLogo || title ? "justify-between" : "justify-end",
                headerClassName
              )}
            >
              {showLogo ? <Logo /> : title}
              <IconButton
                tabIndex={0}
                aria-label="Close Menu"
                onClick={onClose}
                className="text-main text-xl"
              >
                <HiXMark />
              </IconButton>
            </div>

            <div className={clsx("", bodyClassName)}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;

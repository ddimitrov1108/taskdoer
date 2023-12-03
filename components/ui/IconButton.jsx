"use client";
import clsx from "clsx";

const IconButton = ({
  border = false,
  children,
  type = "button",
  className,
  ignoreHoverEffect = false,
  ...restProps
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "text-main hover:text-white outline-none grid items-center justify-center p-1.5 transition-all rounded-full",
        !ignoreHoverEffect && "hover:bg-black-light/10",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default IconButton;

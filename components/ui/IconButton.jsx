"use client";
import clsx from "clsx";

const IconButton = ({
  border = false,
  children,
  type = "button",
  className,
  ...restProps
}) => {
  return (
    <button
      type={type}
      className={clsx(
        "text-main hover:text-white hover:bg-black-light/10 outline-none grid items-center justify-center p-1.5 transition-all rounded-full",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default IconButton;

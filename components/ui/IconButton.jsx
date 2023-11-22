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
        "grid items-center justify-center p-1.5 transition-all rounded-full outline-none hover:bg-slate-50",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default IconButton;

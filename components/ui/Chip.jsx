"use client";
import clsx from "clsx";

const Chip = ({
  text = "chip",
  prependSymbol = "",
  className,
  ...restProps
}) => {
  return (
    <button
      type="button"
      className={clsx(
        "text-sm text-light transition-all flex items-center gap-1 min-w-fit whitespace-no-wrap py-0.5 px-1.5 border border-black-light/40 rounded-full",
        className
      )}
      {...restProps}
    >
      {prependSymbol && (
        <span className="text-primary-main font-medium">{prependSymbol}</span>
      )}
      {text}
    </button>
  );
};

export default Chip;

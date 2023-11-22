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
        "text-sm transition-all flex items-center gap-1 min-w-fit whitespace-no-wrap py-0.5 px-1 border bg-primary-light/10 hover:bg-primary-light/20 rounded-full",
        className
      )}
      {...restProps}
    >
      {prependSymbol && (
        <span className="text-primary-main font-[500]">{prependSymbol}</span>
      )}
      {text}
    </button>
  );
};
export default Chip;

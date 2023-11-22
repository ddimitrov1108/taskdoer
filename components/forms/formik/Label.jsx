import clsx from "clsx";

const Label = ({
  label = "",
  sublabel = "",
  className,
  ignoreResponsiveStyle = false,
  ...restProps
}) => {
  return (
    <div
      className={clsx("text-gray-400 min-w-fit pb-2", className)}
      {...restProps}
    >
      {label && (
        <label
          className={clsx(
            " min-w-fit font-[500]",
            !ignoreResponsiveStyle ? "text-sm md:text-base" : "text-base"
          )}
        >
          {label}
        </label>
      )}

      {sublabel && (
        <label
          className={clsx(
            "min-w-fit",
            !ignoreResponsiveStyle ? "text-sm md:text-base" : "text-base"
          )}
        >
          {sublabel}
        </label>
      )}
    </div>
  );
};
export default Label;

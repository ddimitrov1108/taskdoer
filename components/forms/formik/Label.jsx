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
      className={clsx(
        "text-[#C7C9D9] min-w-fit pb-2",
        className,
        !ignoreResponsiveStyle ? "text-sm md:text-base" : "text-base"
      )}
      {...restProps}
    >
      {label && (
        <label className={clsx(" min-w-fit")}>{label}</label>
      )}

      {sublabel && <label className="min-w-fit">{sublabel}</label>}
    </div>
  );
};
export default Label;

import clsx from "clsx";

export default function Spinner({ className, ...restProps }) {
  return (
    <div className={clsx("loader-spinner", className)} {...restProps}>
      <svg viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
}

import clsx from "clsx";

const ErrorMessage = ({ msg, className, ...restProps }) => {
  return (
    <div
      className={clsx(
        "py-1 text-xs font-semibold transition-all text-error-main",
        className
      )}
      {...restProps}
    >
      {msg}
    </div>
  );
};
export default ErrorMessage;

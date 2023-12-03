import { cva } from "class-variance-authority";
import clsx from "clsx";
import {
  HiCheckCircle,
  HiExclamationCircle,
  HiExclamationTriangle,
  HiInformationCircle,
} from "react-icons/hi2";

const alert = cva("div", {
  variants: {
    intent: {
      info: [
        "bg-white",
        "border-blue-500/40",
        "border-l-blue-500",
        "text-primary-main",
      ],
      success: [
        "bg-success-light/20",
        "border-success-light/40",
        "border-l-success-main",
        "text-success-main",
      ],
      error: [
        "bg-transparent",
        "border-error-light/20",
        "border-l-red-500",
        "text-red-500",
      ],
      warning: [
        "bg-warning-light/20",
        "border-warning-light/40",
        "border-l-warning-main",
        "text-warning-main",
      ],
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Alert = ({ variant = "info", children, ...restProps }) => {
  const IconComponent = {
    info: HiInformationCircle,
    success: HiCheckCircle,
    error: HiExclamationCircle,
    warning: HiExclamationTriangle,
  }[variant];

  return (
    <div
      className={clsx(
        "flex gap-2 mb-4 items-center px-4 py-2.5 border border-l-4 rounded-lg font-semibold",
        alert({ intent: variant })
      )}
      {...restProps}
    >
      <div className="text-2xl">
        <IconComponent />
      </div>

      <span className="text-sm">{children}</span>
    </div>
  );
};
export default Alert;

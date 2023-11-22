"use client";
import { cva } from "class-variance-authority";
import clsx from "clsx";
import { Spinner } from ".";

const button = cva("button", {
  variants: {
    intent: {
      primary: [
        "text-white",
        "bg-primary-main",
        "border-primary-main",
        "hover:bg-primary-dark",
        "hover:border-primary-dark",
      ],
      secondary: [
        "bg-primary-main/20",
        "border-primary-main/20",
        "text-primary-main",
      ],
      outlined: [
        "border-primary-main",
        "bg-white",
        "text-primary-main",
        "hover:bg-primary-main",
        "hover:text-white",
      ],
      error: ["text-white", "bg-error-main"],
      text: ["text-primary-main", "bg-white"],
      basic: [
        "bg-white",
        "borderborder-slate-200 hover:border-slate-300-light/60",
        "hover:borderborder-slate-200 hover:border-slate-300-light",
      ],
    },
    size: {
      sm: ["py-1.5", "px-2"],
      md: ["py-2.5", "px-4"],
      lg: ["py-3.5", "px-6"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
});

export default function Button({
  type = "button",
  variant = "primary",
  fullWidth = false,
  className,
  children = "Button",
  loading = false,
  loadingAnimation = true,
  size = "md",
  ...restProps
}) {
  return (
    <button
      type={type}
      className={clsx(
        "text-sm font-[500] border transition-all duration-300 rounded-lg",
        className,
        fullWidth ? "w-full" : "w-fit",
        button({ intent: variant, size })
      )}
      {...restProps}
    >
      {loading ? (
        loadingAnimation ? (
          <Spinner
            className={clsx(
              "w-fit h-fit mx-auto",
              variant === "outlined" ||
                variant === "text" ||
                variant === "basic"
                ? "text-primary-main"
                : "text-white"
            )}
          />
        ) : (
          children
        )
      ) : (
        children
      )}
    </button>
  );
}

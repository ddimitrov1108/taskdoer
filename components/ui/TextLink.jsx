import Link from "next/link";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const link = cva(Link, {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
});

const TextLink = ({
  size = "normal",
  hoverEffect = true,
  className,
  children,
  ...restProps
}) => {
  return (
    <Link
      className={clsx(
        "w-fit",
        link({ size }),
        hoverEffect
          ? "text-main transition-all hover:text-primary-main"
          : "text-primary-main",
        className
      )}
      {...restProps}
    >
      {children}
    </Link>
  );
};
export default TextLink;

"use client";
import { Label, ErrorMessage } from ".";
import clsx from "clsx";

export default function TextField({
  label = "",
  sublabel = "",
  fullWidth = false,
  className,
  field,
  type = "text",
  disabled,
  form: { errors, touched },
  ...restProps
}) {
  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label label={label} sublabel={sublabel} />

      <input
        disabled={disabled}
        type={type || "text"}
        className={clsx(
          "px-4 py-2.5 border rounded-lg w-full",
          className,
          errors[field.name] && touched[field.name]
            ? " border-error-main focus:outline-error-main"
            : "border-slate-200 hover:border-slate-300 focus:outline-primary-main"
        )}
        {...field}
        {...restProps}
      />

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
}

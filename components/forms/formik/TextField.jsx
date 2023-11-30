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
      <Label
        className="pb-2"
        htmlFor={field.name}
        label={label}
        sublabel={sublabel}
      />

      <input
        autoComplete="on"
        disabled={disabled}
        type={type || "text"}
        className={clsx(
          "bg-black-dark border outline-none px-4 py-2.5 rounded-lg w-full",
          className,
          errors[field.name] && touched[field.name]
            ? "border-error-main"
            : "border-black-light/40 focus:border-primary-main"
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

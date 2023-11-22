"use client";
import { Label, ErrorMessage } from ".";
import clsx from "clsx";

const TextAreaField = ({
  label = "",
  fullWidth = false,
  className,
  field,
  form: { errors, touched },
  ...restProps
}) => {
  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      {label && <Label label={label} />}

      <textarea
        className={clsx(
          "p-4 border w-full rounded-lg max-h-[300px] bg-white",
          className,
          errors[field.name] && touched[field.name]
            ? " border-error-main focus:outline-error-main"
            : "border-slate-200 focus:outline-primary-main"
        )}
        {...field}
        {...restProps}
        rows={2}
      ></textarea>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};
export default TextAreaField;

"use client";
import { Label, ErrorMessage } from ".";
import { format } from "date-fns";
import clsx from "clsx";

const DatePickerField = ({
  label = "",
  sublabel = "",
  fullWidth = false,
  className,
  field,
  disabled,
  form: { errors, touched },
  ...restProps
}) => {
  const onKeyDownHandler = (e) => {
    if (e.key === "Tab") return;

    e.preventDefault();
  };

  const formatedDate = format(new Date(field.value), "dd/MM/yyyy");

  return (
    <div className={clsx("mb-4 min-h-fit", fullWidth ? "w-full" : "w-fit")}>
      <Label label={label} sublabel={sublabel} />

      <input
        disabled={disabled}
        type="date"
        placeholder={formatedDate}
        className={clsx(
          "px-4 py-2.5 border rounded-lg w-full",
          className,
          errors[field.name] && touched[field.name]
            ? " border-error-main focus:outline-error-main"
            : "border-slate-200 hover:border-slate-300 focus:outline-primary-main"
        )}
        onKeyDown={onKeyDownHandler}
        {...field}
        {...restProps}
      />

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};

export default DatePickerField;

"use client";
import { Label, ErrorMessage } from ".";
import { format, isValid } from "date-fns";
import clsx from "clsx";

const tryFormatDate = (value) => {
  try {
    const parsedDate = parseISO(value);
    if (isValid(parsedDate)) {
      return format(parsedDate, "dd/MM/yyyy");
    } else {
      return "";
    }
  } catch (error) {
    return "";
  }
};

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
  const formatedDate = tryFormatDate(field.value);

  return (
    <div className={clsx("mb-4 min-h-fit", fullWidth ? "w-full" : "w-fit")}>
      <Label
        className="pb-2"
        htmlFor={field.name}
        label={label}
        sublabel={sublabel}
      />

      <input
        disabled={disabled}
        type="date"
        placeholder={formatedDate}
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
};

export default DatePickerField;

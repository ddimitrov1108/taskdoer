"use client";

import { Switch } from "@headlessui/react";
import { Label } from ".";
import clsx from "clsx";

const CheckBoxField = ({
  label = "",
  sublabel = "",
  fullWidth = false,
  className,
  field,
  disabled,
  form: { setFieldValue },
}) => {
  return (
    <Switch.Group
      as="div"
      className={clsx(
        "flex items-center gap-2 mb-4",
        fullWidth ? "w-full" : "w-fit"
      )}
    >
      <Label htmlFor={field.name} label={label} sublabel={sublabel} />
      <Switch
        disabled={disabled}
        checked={field.value}
        onChange={() => setFieldValue(field.name, !field.value)}
        className={clsx(
          "border border-black-light/40 relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none",
          field.value ? "bg-primary-main" : "bg-black-dark"
        )}
      >
        <span className="sr-only">Enable</span>
        <span
          className={clsx(
            "inline-block w-4 h-4 transform rounded-full transition-transform",
            field.value ? "bg-white translate-x-6" : "bg-light translate-x-1"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};
export default CheckBoxField;

"use client";
import { Label, ErrorMessage } from ".";
import { defaultColors } from "@/components/constants";
import clsx from "clsx";

const ColorPickerField = ({
  label = "",
  sublabel = "",
  fullWidth = false,
  field,
  form: { setFieldValue, errors, touched },
  className
}) => {
  const onClickHandler = (color) => {
    setFieldValue(field.name, color);
  };

  return (
    <div className={clsx("mb-4", className, fullWidth ? "w-full" : "w-fit")}>
      <Label htmlFor={field.name} label={label} sublabel={sublabel} />

      <div className="w-full flex flex-wrap gap-2">
        {defaultColors.map((color) => (
          <button
            type="button"
            key={color}
            className="flex justify-center items-center w-7 h-7 rounded-full"
            style={{ backgroundColor: color }}
            onClick={() => onClickHandler(color)}
          >
            <div
              className={clsx(
                "transition-all rounded-full",
                color === field.value ? "bg-black-main p-2.5" : "bg-inherit p-0"
              )}
            ></div>
          </button>
        ))}
      </div>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};
export default ColorPickerField;

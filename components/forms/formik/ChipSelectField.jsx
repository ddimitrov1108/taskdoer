"use client";
import { Chip } from "@/components/ui";
import { Label, ErrorMessage } from ".";
import clsx from "clsx";

const ChipSelectField = ({
  label,
  sublabel,
  fullWidth = false,
  field,
  form: { errors, touched, setFieldValue },
  options = [],
}) => {
  const onClickHandler = (option) => {
    alert(1);
    console.log(field.value);
    const isContained = field.value.find((o) => o.id === option.id);

    if (!isContained) setFieldValue(field.name, [...field.value, option]);
    else
      setFieldValue(
        field.name,
        field.value.filter((obj) => obj.id != option.id)
      );
  };

  console.log(field.value);

  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label label={label} sublabel={sublabel} />

      <div className="max-h-[200px] flex items-center gap-2 flex-wrap overflow-auto styled-overflow">
        {options.map((option) => (
          <Chip
            key={option.id}
            text={option.name}
            onClick={() => onClickHandler(option)}
            className={
              field.value.find((o) => o.id === option.id)
                ? "border-primary-main"
                : "border-slate-200"
            }
          />
        ))}
      </div>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};
export default ChipSelectField;

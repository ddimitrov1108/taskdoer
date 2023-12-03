"use client";
import useSWR from "swr";
import { fetcher } from "@/lib/swr-fetcher";
import { Chip, Spinner } from "@/components/ui";
import { Label, ErrorMessage } from ".";
import clsx from "clsx";

const LabelsSelectField = ({
  label,
  sublabel,
  fullWidth = false,
  field,
  form: { errors, touched, setFieldValue },
}) => {
  const { data: labels, error, isLoading } = useSWR("/api/labels", fetcher);

  const onClickHandler = (option) => {
    const isContained = field.value.find((o) => o.id === option.id);

    if (!isContained) setFieldValue(field.name, [...field.value, option]);
    else
      setFieldValue(
        field.name,
        field.value.filter((obj) => obj.id != option.id)
      );
  };

  if (error) {
    console.log(error);
  }

  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label
        className="pb-2"
        htmlFor={field.name}
        label={label}
        sublabel={sublabel}
      />

      {error ? (
        <span className="text-sm text-main">
          You have no labels to show here
        </span>
      ) : isLoading ? (
        <Spinner className="text-primary-main" />
      ) : labels.length > 0 ? (
        <div className="max-h-[200px] flex items-center gap-1 flex-wrap overflow-auto styled-overflow">
          {labels.map((label) => (
            <Chip
              key={label.id}
              text={label.name}
              prependSymbol="@"
              onClick={() => onClickHandler(label)}
              className={
                field.value.find((o) => o.id === label.id) &&
                "border-primary-main"
              }
            />
          ))}
        </div>
      ) : (
        <span className="text-sm text-main">
          You have no labels to show here
        </span>
      )}

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};
export default LabelsSelectField;

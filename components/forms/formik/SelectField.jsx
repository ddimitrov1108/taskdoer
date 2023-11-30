"use client";
import { Label, ErrorMessage } from ".";
import { Listbox } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import clsx from "clsx";

const SelectField = ({
  label = "",
  sublabel = "",
  fullWidth = false,
  className,
  field,
  form: { errors, touched, setFieldValue },
  options = [],
}) => {
  const onChangeHandler = (option) => {
    setFieldValue(field.name, option);
  };

  return (
    <div className={clsx("mb-4", fullWidth ? "w-full" : "w-fit")}>
      <Label
        className="pb-2"
        htmlFor={field.name}
        label={label}
        sublabel={sublabel}
      />

      <Listbox value={field.value} onChange={onChangeHandler} className="">
        {({ open }) => (
          <>
            <div
              className={clsx(
                "relative outline-none rounded-lg w-full",
                className
              )}
            >
              <Listbox.Button
                className={clsx(
                  "border outline-none -outline-offset-1 relative rounded-lg w-full flex items-center text-left cursor-pointer px-4 py-2.5",
                  errors[field.name] && touched[field.name]
                    ? " border-error-main focus:outline-error-main"
                    : "border-gray-200 hover:bg-gray-50 focus:outline-primary-main",
                  open && " outline-primary-main"
                )}
              >
                <span className="grow">{field.value}</span>
                <HiChevronDown
                  className={clsx(
                    "absolute top-3.5 right-3 transition-all min-w-fit text-lg text-main",
                    open && "rotate-180"
                  )}
                />
              </Listbox.Button>

              <Listbox.Options className="z-10 mt-2 absolute w-full rounded-lg bg-white shadow-lg ">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      clsx(
                        "px-4 py-2.5 cursor-pointer hover:bg-gray-50",
                        active && "bg-gray-100"
                      )
                    }
                    value={option}
                  >
                    {({ active }) => <span>{option}</span>}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </>
        )}
      </Listbox>

      {errors[field.name] && touched[field.name] && (
        <ErrorMessage msg={errors[field.name]} />
      )}
    </div>
  );
};
export default SelectField;

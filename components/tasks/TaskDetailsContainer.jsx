"use client";
import { IconButton } from "../ui";
import { HiXMark } from "react-icons/hi2";
import { Label } from "../forms/formik";
import { format, parseISO, toDate } from "date-fns";
import clsx from "clsx";

const TaskDetailsContainer = ({ task, open, setOpen }) => {
  return (
    <div
      className={clsx(
        "hidden bg-white z-40 h-full overflow-auto styled-overflow",
        open && "xl:block fixed top-0 right-0 bottom-0 w-96"
      )}
    >
      <div className="px-6 py-4">
        <div className="flex items-center w-full justify-end">
          <IconButton
            tabIndex={0}
            aria-label="Close Menu"
            onClick={setOpen}
            className="text-xl"
          >
            <HiXMark />
          </IconButton>
        </div>
      </div>

      <div className="p-6">
        {open && (
          <div className="grid gap-3">
            <div>
              <Label
                label="Name"
                className="-mb-2 text-base"
                ignoreResponsiveStyle
              />
              {task.name}
            </div>

            <div>
              <Label
                label="Description"
                className="-mb-2 text-base"
                ignoreResponsiveStyle
              />
              {task.description}
            </div>

            <div>
              <Label
                label="Due Date"
                className="-mb-2 text-base"
                ignoreResponsiveStyle
              />
              {format(toDate(parseISO(task.dueDate)), "dd/MM/yyyy")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsContainer;

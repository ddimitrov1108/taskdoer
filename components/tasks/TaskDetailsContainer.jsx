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
        "transition-all hidden bg-black-main h-full overflow-auto styled-overflow",
        open && "xl:block fixed top-0 right-0 bottom-0 w-96"
      )}
    >
      <div className="px-6 py-4">
        <div className="flex items-center w-full justify-between">
          <h1 className="font-medium">Task Details</h1>
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
                className="text-main"
                ignoreResponsiveStyle
              />
              {task.name}
            </div>

            <div>
              <Label
                label="Description"
                className="text-main"
                ignoreResponsiveStyle
              />
              {task.description}
            </div>

            <div>
              <Label
                label="Due Date"
                className="text-main"
                ignoreResponsiveStyle
              />
              {format(task.dueDate, "dd/MM/yyyy")}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskDetailsContainer;

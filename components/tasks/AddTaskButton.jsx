"use client";
import { HiPlus } from "react-icons/hi2";
import { Button } from "../ui";
import clsx from "clsx";
import { useContext } from "react";
import { TaskContext } from "../providers/TaskProvider";

const AddTaskButton = ({ className, ...restProps }) => {
  const taskContext = useContext(TaskContext);

  return (
    <Button
      size="sm"
      variant="primary"
      className={clsx("px-2 flex items-center gap-1 justify-center", className)}
      onClick={() => taskContext.setOpenNewTaskModal(true)}
      {...restProps}
    >
      <HiPlus className="text-xl" /> Add task
    </Button>
  );
};
export default AddTaskButton;

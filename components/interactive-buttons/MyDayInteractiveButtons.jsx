"use client";
import { useContext } from "react";
import { AddTaskButton } from "../tasks";
import { TaskContext } from "../providers/TaskProvider";

const MyDayInteractiveButtons = () => {
  const taskContext = useContext(TaskContext);

  return (
    <div className="min-w-full md:min-w-fit flex items-center justify-between gap-2">
      <AddTaskButton onClick={() => taskContext.setOpenNewTaskModal(true)} />
    </div>
  );
};
export default MyDayInteractiveButtons;

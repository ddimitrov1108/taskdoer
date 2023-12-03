"use client";
import { AddTaskButton } from "../tasks";

const MyDayInteractiveButtons = () => {
  return (
    <div className="min-w-full md:min-w-fit flex items-center justify-between gap-2">
      <AddTaskButton />
    </div>
  );
};
export default MyDayInteractiveButtons;

"use client";

import Image from "next/image";
import { DisclouseContainer } from "../ui";
import Task from "./Task";
import { useContext } from "react";
import { TaskContext } from "../providers/TaskProvider";
import { AddTaskButton } from ".";
import { isFuture, isPast, isToday } from "date-fns";

const sortByDate = (arr) => arr.sort((a, b) => a.dueDate - b.dueDate);

const TasksList = ({ tasks = [] }) => {
  const taskContext = useContext(TaskContext);

  if (tasks.length === 0)
    return (
      <>
        <div className="py-32 grid justify-center items-center gap-6">
          <Image
            src="/no-tasks.svg"
            width={256}
            height={256}
            alt="no-tasks.svg"
            className="w-16 h-16 md:w-24 md:h-24 mx-auto"
          />

          <p className="text-center text-main">
            No tasks to be shown here! You either completed all of the tasks 🎉,
            <br />
            or you havent added any tasks to this section.
          </p>

          <AddTaskButton
            className="mx-auto"
            onClick={() => taskContext.setOpenNewTaskModal(true)}
          />
        </div>
      </>
    );

  const pastDueTasks = sortByDate(
    tasks.filter(
      (e) => !e.completed && isPast(e.dueDate) && !isToday(e.dueDate)
    )
  );

  const importantTasks = sortByDate(
    tasks.filter(
      (e) =>
        e.important &&
        !e.completed &&
        (isToday(e.dueDate) || isFuture(e.dueDate))
    )
  );

  const activeTasks = sortByDate(
    tasks.filter(
      (e) =>
        !e.important &&
        !e.completed &&
        (isToday(e.dueDate) || isFuture(e.dueDate))
    )
  );

  const completedTasks = sortByDate(tasks.filter((e) => e.completed));

  return (
    <div className="grid gap-6">
      {pastDueTasks.length > 0 && (
        <DisclouseContainer title="Past Due" btnClassName="py-2 text-main" open>
          {pastDueTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </DisclouseContainer>
      )}

      {importantTasks.length > 0 && (
        <div className="grid gap-3">
          <h1 className="font-medium text-main">Important Tasks</h1>

          <div>
            {importantTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {activeTasks.length > 0 && (
        <div className="grid gap-3">
          <h1 className="font-medium text-main">Tasks</h1>

          <div>
            {activeTasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      {completedTasks.length > 0 && (
        <DisclouseContainer
          title="Completed"
          btnClassName="py-2 text-main"
          open
        >
          {completedTasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </DisclouseContainer>
      )}
    </div>
  );
};
export default TasksList;

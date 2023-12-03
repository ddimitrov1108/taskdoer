"use client";
import Image from "next/image";
import { DisclouseContainer } from "../ui";
import Task from "./Task";
import { AddTaskButton } from ".";
import { isFuture, isPast, isToday } from "date-fns";

const sortByDate = (arr) => arr.sort((a, b) => a.dueDate - b.dueDate);

const TasksCompletedStatus = () => (
  <div className="py-24 lg:py-32 grid justify-center items-center gap-4">
    <div>
      <Image
        src="/tasks-completed.svg"
        width={128}
        height={128}
        alt="tasks-completed.svg"
        className="w-24 h-24 lg:w-32 lg:h-32 mx-auto"
      />

      <p className="text-center text-main">
        🎉 All of your tasks are completed!
        <br />
        You can rest now or start a new one.
      </p>
    </div>

    <AddTaskButton className="mx-auto" />
  </div>
);

const TasksNotFound = () => (
  <div className="py-24 lg:py-32 grid justify-center items-center gap-4">
    <div>
      <Image
        src="/tasks-notfound.svg"
        width={128}
        height={128}
        alt="tasks-notfound.svg"
        className="w-24 h-24 lg:w-32 lg:h-32 mx-auto"
      />

      <p className="text-center text-main">
        🔍 No tasks have been added in this section.
      </p>
    </div>

    <AddTaskButton className="mx-auto" />
  </div>
);

const TasksList = ({ tasks = [] }) => {
  if (!tasks || tasks.length === 0) return <TasksNotFound />;

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
      {!pastDueTasks.length && !importantTasks.length && !activeTasks.length ? (
        <TasksCompletedStatus />
      ) : (
        <>
          {!!pastDueTasks.length && (
            <DisclouseContainer
              title="Past Due"
              btnClassName="py-2 text-main"
              open
            >
              {pastDueTasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </DisclouseContainer>
          )}

          {!!importantTasks.length && (
            <div className="grid gap-3">
              <h1 className="font-medium text-main">Important Tasks</h1>

              <div>
                {importantTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}

          {!!activeTasks.length && (
            <div className="grid gap-3">
              <h1 className="font-medium text-main">Tasks</h1>

              <div>
                {activeTasks.map((task) => (
                  <Task key={task.id} task={task} />
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {!!completedTasks.length && (
        <DisclouseContainer
          title="Completed"
          btnClassName="py-2 text-main"
          open={false}
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

"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { DisclouseContainer } from "../ui";
import { useSound } from "../hooks";
import Task from "./Task";
import { TaskModal } from "../modals";
import { useState } from "react";

const TasksList = ({ tasks = [] }) => {
  const router = useRouter();
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [isPlaying, playSound, stopSound] = useSound(
    "http://localhost:3000/task-completed.wav"
  );

  const setCompleted = async (task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    })
      .then(() => {
        if (!task.completed) playSound();
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setImportant = async (task) => {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        important: !task.important,
      }),
    })
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (tasks.length === 0)
    return (
      <>
        <TaskModal
          open={openNewTaskModal}
          setOpen={setOpenNewTaskModal}
          afterFormSubmit={() => setOpenNewTaskModal(false)}
        />

        <div className="py-32 grid justify-center items-center gap-6">
          <Image
            src="/no-tasks.svg"
            width={256}
            height={256}
            alt="no-tasks.svg"
            className="w-24 h-24 md:w-32 md:h-32 mx-auto"
          />
          <p className="text-center text-main">
            No tasks to be shown here! You either completed all of the tasks 🎉,
            <br />
            or havent added any tasks to this section.
          </p>
        </div>
      </>
    );

  const importantTasks = tasks
    .filter((e) => e.important && !e.completed)
    .sort((a, b) => a.dueDate - b.dueDate);

  const activeTasks = tasks
    .filter((e) => !e.completed && !e.important)
    .sort((a, b) => a.dueDate - b.dueDate);

  const completedTasks = tasks
    .filter((e) => e.completed)
    .sort((a, b) => a.dueDate - b.dueDate);

  return (
    <div className="grid gap-6">
      {importantTasks.length > 0 && (
        <div className="grid gap-3">
          <h1 className="font-medium text-main">Important Tasks</h1>

          <div>
            {importantTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onCompletedHandler={setCompleted}
                onImportantHandler={setImportant}
              />
            ))}
          </div>
        </div>
      )}

      {activeTasks.length > 0 && (
        <div className="grid gap-3">
          <h1 className="font-medium text-main">Tasks</h1>

          <div>
            {activeTasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                onCompletedHandler={setCompleted}
                onImportantHandler={setImportant}
              />
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
            <Task
              key={task.id}
              task={task}
              onCompletedHandler={setCompleted}
              onImportantHandler={setImportant}
            />
          ))}
        </DisclouseContainer>
      )}
    </div>
  );
};
export default TasksList;

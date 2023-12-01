"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteConfirmationModal, TaskModal } from "../modals";
import { enqueueSnackbar } from "notistack";
import { useSound } from "../hooks";

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState(null);
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState(false);
  const [openDetailsTaskModal, setOpenDetailsTaskModal] = useState(false);

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

  const deleteTask = async () => {
    await fetch(`/api/tasks/${selectedTask?.id}`, {
      method: "DELETE",
    })
      .then(() => {
        enqueueSnackbar("Task deleted.", { variant: "info" });
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenDeleteTaskModal(false);
  };

  return (
    <TaskContext.Provider
      value={{
        selectedTask,
        setSelectedTask,
        setCompleted,
        setImportant,
        setOpenNewTaskModal,
        setOpenDetailsTaskModal,
        setOpenDeleteTaskModal,
      }}
    >
      <TaskModal
        open={openNewTaskModal}
        setOpen={setOpenNewTaskModal}
        afterFormSubmit={() => setOpenNewTaskModal(false)}
      />

      <TaskModal
        editMode={true}
        initialState={selectedTask}
        open={openDetailsTaskModal}
        setOpen={setOpenDetailsTaskModal}
        afterFormSubmit={() => {
          setOpenDetailsTaskModal(false);
          setSelectedTask(null);
        }}
      />

      <DeleteConfirmationModal
        text={`Are you sure you want to delete "${selectedTask?.name}"?`}
        open={openDeleteTaskModal}
        setOpen={setOpenDeleteTaskModal}
        onSubmit={deleteTask}
      />

      <div>{children}</div>
    </TaskContext.Provider>
  );
};
export default TaskProvider;

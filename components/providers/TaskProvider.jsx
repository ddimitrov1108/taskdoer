"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteConfirmationModal, TaskModal } from "../modals";
import { enqueueSnackbar } from "notistack";
import { useSideBarState, useSound } from "../hooks";
import { TaskDetailsContainer } from "../tasks";
import { TaskDetailsSideBar } from "../sidebars";
import clsx from "clsx";

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState(null);
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState(false);
  const [openTaskEditModal, setOpenTaskEditModal] = useState(false);
  const { open: showTaskDetailsSideBar, setOpen: setShowTaskDetailsSideBar } =
    useSideBarState(false);

  const [isPlaying, playSound, stopSound] = useSound(
    "http://localhost:3000/task-completed.wav"
  );

  const setCompleted = async (task) => {
    await fetch(`/api/tasks/${task.id}/complete`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        completed: !task.completed,
        editLabels: false,
      }),
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;

        if (!task.completed) playSound();
        router.refresh();
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: "error" });
      });
  };

  const setImportant = async (task) => {
    await fetch(`/api/tasks/${task.id}/important`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        important: !task.important,
        editLabels: false,
      }),
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;
        
        router.refresh();
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: "error" });
      });
  };

  const deleteTask = async () => {
    await fetch(`/api/tasks/${selectedTask?.id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;

        enqueueSnackbar("Task deleted.", { variant: "info" });
        router.refresh();
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: "error" });
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
        setOpenTaskEditModal,
        setOpenDeleteTaskModal,
        setShowTaskDetailsSideBar,
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
        open={openTaskEditModal}
        setOpen={setOpenTaskEditModal}
        afterFormSubmit={() => {
          setOpenTaskEditModal(false);
          setSelectedTask(null);
        }}
      />

      <DeleteConfirmationModal
        text={`Are you sure you want to delete "${selectedTask?.name}"?`}
        open={openDeleteTaskModal}
        setOpen={setOpenDeleteTaskModal}
        onSubmit={deleteTask}
      />

      <TaskDetailsSideBar
        open={showTaskDetailsSideBar}
        onClose={() => setShowTaskDetailsSideBar(false)}
        task={selectedTask}
      />

      <div
        className={clsx(showTaskDetailsSideBar && "transition-all xl:mr-96")}
      >
        {children}
        <TaskDetailsContainer
          open={showTaskDetailsSideBar}
          setOpen={() => setShowTaskDetailsSideBar(false)}
          task={selectedTask}
        />
      </div>
    </TaskContext.Provider>
  );
};
export default TaskProvider;

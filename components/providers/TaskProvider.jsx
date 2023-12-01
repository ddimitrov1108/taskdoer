"use client";
import { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { DeleteConfirmationModal, TaskModal } from "../modals";
import { enqueueSnackbar } from "notistack";

export const TaskContext = createContext(null);

const TaskProvider = ({ children }) => {
  const router = useRouter();
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDeleteTaskModal, setOpenDeleteTaskModal] = useState(false);
  const [openDetailsTaskModal, setOpenDetailsTaskModal] = useState(false);

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
        setOpenDetailsTaskModal,
        setOpenDeleteTaskModal,
      }}
    >
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

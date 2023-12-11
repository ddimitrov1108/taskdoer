"use client";
import { useId, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteConfirmationModal, ProjectModal } from "../modals";
import { Dropdown, DropdownListItem, IconButton } from "../ui";
import {
  HiEllipsisHorizontal,
  HiOutlineDocumentMinus,
  HiOutlinePencilSquare,
  HiOutlineTrash,
} from "react-icons/hi2";
import { enqueueSnackbar } from "notistack";
import { AddTaskButton } from "../tasks";

const ProjectInteractiveButtons = ({ project }) => {
  const params = useParams();
  const router = useRouter();
  const [openEditProjectModal, setOpenEditProjectModal] = useState(false);
  const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false);
  const [openDeleteProjectTasks, setOpenDeleteProjectTasks] = useState(false);

  const deleteProject = async () => {
    await fetch(`/api/projects/${params.id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;

        enqueueSnackbar("Project deleted successfully!", {
          variant: "success",
        });
        router.replace("/todo");
        router.refresh();
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: "error" });
      });

    setOpenDeleteProjectModal(false);
  };

  const deleteAllTasks = async () => {
    await fetch(`/api/projects/${params.id}/delete-tasks`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if (error) throw error;

        enqueueSnackbar("Tasks deleted successfully!", {
          variant: "success",
        });
        router.refresh();
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: "error" });
      });

    setOpenDeleteProjectTasks(false);
  };

  const onEditProjectHandler = () => setOpenEditProjectModal(true);
  const onDeleteAllTasksHandler = () => setOpenDeleteProjectTasks(true);
  const onDeleteProjectHandler = () => setOpenDeleteProjectModal(true);

  const projectInteractions = [
    {
      id: useId(),
      name: "Edit Project",
      icon: <HiOutlinePencilSquare />,
      onClick: onEditProjectHandler,
      className: "text-light hover:text-white",
      iconClassName: "text-primary-main",
    },
    {
      id: useId(),
      name: "Delete All Tasks",
      icon: <HiOutlineDocumentMinus />,
      onClick: onDeleteAllTasksHandler,
      className: "text-error-main",
      iconClassName: "text-error-main",
    },
    {
      id: useId(),
      name: "Delete",
      icon: <HiOutlineTrash />,
      onClick: onDeleteProjectHandler,
      className: "text-error-main",
      iconClassName: "text-error-main",
    },
  ];

  return (
    <>
      <ProjectModal
        initialState={project}
        editMode={true}
        open={openEditProjectModal}
        setOpen={setOpenEditProjectModal}
        afterFormSubmit={() => setOpenEditProjectModal(false)}
      />

      <DeleteConfirmationModal
        text="Do you want to delete this project? All tasks will be deleted."
        open={openDeleteProjectModal}
        setOpen={setOpenDeleteProjectModal}
        onSubmit={deleteProject}
      />

      <DeleteConfirmationModal
        text="Do you want to delete all tasks in this project?"
        open={openDeleteProjectTasks}
        setOpen={setOpenDeleteProjectTasks}
        onSubmit={deleteAllTasks}
      />

      <div className="min-w-full md:min-w-fit flex items-center justify-between gap-2">
        <AddTaskButton />

        <Dropdown
          btn={
            <IconButton
              className="transition-all text-2xl bg-black-main"
              ignoreHoverEffect
            >
              <HiEllipsisHorizontal />
            </IconButton>
          }
        >
          {projectInteractions.map(
            ({ id, className, iconClassName, onClick, ...item }) => (
              <DropdownListItem
                key={id}
                as="button"
                onClick={onClick}
                item={item}
                className={className}
                iconClassName={iconClassName}
              />
            )
          )}
        </Dropdown>
      </div>
    </>
  );
};
export default ProjectInteractiveButtons;

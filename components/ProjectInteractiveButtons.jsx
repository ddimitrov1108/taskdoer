"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteConfirmationModal, ProjectModal, TaskModal } from "./modals";
import { Button, IconButton } from "./ui";
import { HiOutlinePencilSquare, HiPlus, HiOutlineTrash } from "react-icons/hi2";
import { enqueueSnackbar } from "notistack";

const ProjectInteractiveButtons = ({ project }) => {
  const params = useParams();
  const router = useRouter();
  const [openNewTaskModal, setOpenNewTaskModal] = useState(false);
  const [openEditProjectModal, setOpenEditProjectModal] = useState(false);
  const [openDeleteProjectModal, setOpenDeleteProjectModal] = useState(false);

  const deleteProject = async () => {
    await fetch(`/api/projects/${params.id}`, {
      method: "DELETE",
    })
      .then(() => {
        enqueueSnackbar("Project deleted successfully", { variant: "success" });
        router.replace("/todo");
        router.refresh();
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenDeleteProjectModal(false);
  };

  const onNewTaskHandler = () => setOpenNewTaskModal(true);
  const onEditProjectHandler = () => setOpenEditProjectModal(true);
  const onDeleteProjectHandler = () => setOpenDeleteProjectModal(true);

  return (
    <>
      <TaskModal
        open={openNewTaskModal}
        setOpen={setOpenNewTaskModal}
        afterFormSubmit={() => setOpenNewTaskModal(false)}
      />

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

      <div className="min-w-full md:min-w-fit flex items-center justify-between gap-2">
        <Button
          size="sm"
          variant="primary"
          className="flex items-center gap-1 justify-center"
          onClick={onNewTaskHandler}
        >
          <HiPlus className="text-xl" /> Add task
        </Button>

        <div className="flex items-center gap-2">
          <IconButton
            title="Edit Project"
            onClick={onEditProjectHandler}
            className="p-2 bg-black-light/10 text-xl"
          >
            <HiOutlinePencilSquare className="text-primary-main hover:text-primary-main" />
          </IconButton>

          <IconButton
            title="Delete Project"
            onClick={onDeleteProjectHandler}
            className="p-2 bg-black-light/10 text-xl"
          >
            <HiOutlineTrash className="text-error-main hover:text-error-main" />
          </IconButton>
        </div>
      </div>
    </>
  );
};
export default ProjectInteractiveButtons;

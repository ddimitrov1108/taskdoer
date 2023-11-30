"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteConfirmationModal, ProjectModal, TaskModal } from "./modals";
import { Button, IconButton } from "./ui";
import {
  HiOutlinePencilSquare,
  HiOutlinePlus,
  HiOutlineTrash,
} from "react-icons/hi2";

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
        router.refresh();
        router.replace("/myapp");
      })
      .catch((err) => {
        console.log(err);
      });

    setOpenDeleteProjectModal(false);
  };

  const onNewTaskHandler = () => setOpenNewTaskModal(true);
  const onEditProjectHandler = () => setOpenEditProjectModal(true);
  const onProjectDeleteHandler = () => setOpenDeleteProjectModal(true);

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

      <div className="min-w-fit flex items-center justify-end gap-2">
        <Button
          size="sm"
          variant="text"
          className="border-none flex items-center gap-2 justify-center"
          onClick={onNewTaskHandler}
        >
          <HiOutlinePlus className="text-light text-xl" /> Add task
        </Button>

        <IconButton
          title="Edit Project"
          onClick={onEditProjectHandler}
          className="bg-black-light/10 text-primary-main hover:text-primary-main text-xl"
        >
          <HiOutlinePencilSquare />
        </IconButton>

        <IconButton
          title="Delete Project"
          onClick={onProjectDeleteHandler}
          className="bg-black-light/10 text-error-main hover:text-error-main text-xl"
        >
          <HiOutlineTrash />
        </IconButton>
      </div>
    </>
  );
};
export default ProjectInteractiveButtons;
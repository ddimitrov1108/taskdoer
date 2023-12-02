"use client";

import { useContext, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteConfirmationModal, ProjectModal } from "../modals";
import { IconButton } from "../ui";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { enqueueSnackbar } from "notistack";
import { AddTaskButton } from "../tasks";
import { TaskContext } from "../providers/TaskProvider";
import { ToolTip } from "..";

const ProjectInteractiveButtons = ({ project }) => {
  const taskContext = useContext(TaskContext);
  const params = useParams();
  const router = useRouter();
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

  const onEditProjectHandler = () => setOpenEditProjectModal(true);
  const onDeleteProjectHandler = () => setOpenDeleteProjectModal(true);

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

      <div className="min-w-full md:min-w-fit flex items-center justify-between gap-2">
        <AddTaskButton onClick={() => taskContext.setOpenNewTaskModal(true)} />

        <div className="flex items-center gap-2">
          <IconButton
            data-tooltip-id="edit-project-tooltip"
            data-tooltip-content="Edit Project"
            data-tooltip-place="bottom"
            title="Edit Project"
            onClick={onEditProjectHandler}
            className="p-3 bg-black-light/10 text-xl"
          >
            <HiOutlinePencilSquare className="text-primary-main hover:text-primary-main" />
          </IconButton>

          <IconButton
            data-tooltip-id="delete-project-tooltip"
            data-tooltip-content="Delete Project"
            data-tooltip-place="bottom"
            title="Delete Project"
            onClick={onDeleteProjectHandler}
            className="p-3 bg-black-light/10 text-xl"
          >
            <HiOutlineTrash className="text-error-main hover:text-error-main" />
          </IconButton>

          <ToolTip id="edit-project-tooltip" className="bg-red-500" />
          <ToolTip id="delete-project-tooltip" className="bg-red-500" />
        </div>
      </div>
    </>
  );
};
export default ProjectInteractiveButtons;

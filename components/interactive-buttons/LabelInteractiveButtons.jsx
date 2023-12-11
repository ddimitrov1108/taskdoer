"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { IconButton } from "../ui";
import { DeleteConfirmationModal, LabelModal } from "../modals";
import { enqueueSnackbar } from "notistack";

const LabelInteractiveButtons = ({ label }) => {
  const params = useParams();
  const router = useRouter();
  const [openEditLabelModal, setOpenEditLabelModal] = useState(false);
  const [openDeleteLabelModal, setOpenDeleteLabelModal] = useState(false);

  const deleteLabel = async () => {
    await fetch(`/api/labels/${params.id}`, {
      method: "DELETE",
    })
      .then((data) => data.json())
      .then(({ error }) => {
        if(error) throw error;
        
        enqueueSnackbar("Label deleted successfully!", { variant: "success" });
        router.replace("/todo");
        router.refresh();
      })
      .catch((error) => {
        enqueueSnackbar(error, { variant: "error" });
      });

    setOpenDeleteLabelModal(false);
  };

  const onEditLabelHandler = () => setOpenEditLabelModal(true);
  const onDeleteLabelHandler = () => setOpenDeleteLabelModal(true);

  return (
    <>
      <LabelModal
        initialState={label}
        editMode={true}
        open={openEditLabelModal}
        setOpen={setOpenEditLabelModal}
        afterFormSubmit={() => setOpenEditLabelModal(false)}
      />

      <DeleteConfirmationModal
        text="Do you want to delete this label? This label will be removed from task reference."
        open={openDeleteLabelModal}
        setOpen={setOpenDeleteLabelModal}
        onSubmit={deleteLabel}
      />

      <div className="md:min-w-fit flex items-center justify-end gap-2">
        <IconButton
          title="Edit Project"
          onClick={onEditLabelHandler}
          className="p-2 bg-black-light/10 text-xl"
        >
          <HiOutlinePencilSquare className="text-primary-main hover:text-primary-main" />
        </IconButton>

        <IconButton
          title="Delete Project"
          onClick={onDeleteLabelHandler}
          className="p-2 bg-black-light/10 text-xl"
        >
          <HiOutlineTrash className="text-error-main hover:text-error-main" />
        </IconButton>
      </div>
    </>
  );
};
export default LabelInteractiveButtons;
